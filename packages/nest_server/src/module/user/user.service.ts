import * as crypto from 'crypto';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt/dist';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResultData } from '../../common/utils/result';
import { userLoginData } from '../../common/types/user';

import { LoginUserDto } from './dto/login-user.dto';
import { CreateTokenDto } from './dto/create-token.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  private userList = [
    {
      userId: '1',
      name: '管理员',
      age: 18,
      gender: 1,
      username: 'admin',
      password: '123456',
      phone: 13888888888,
    },
  ]; // 没有数据库，暂时通过该方式定义数据
  async getUserLogin(userData: LoginUserDto): Promise<ResultData> {
    const { lot_number, captcha_output, pass_token, gen_time, username } =
      userData;
    const user = await this.getUserDetail(username);
    if (!user) {
      return ResultData.fail(-1, '帐号或密码错误');
    }
    // geetest 公钥
    // geetest public key
    const CAPTCHA_ID = '647f5ed2ed8acb4be36784e01556bb71';
    // geetest 密钥
    // geetest secret key
    const CAPTCHA_KEY = 'b09a7aafbfd83f73b35a9b530d0337bf';
    // geetest 服务地址
    // geetest server url
    const API_SERVER = 'http://gcaptcha4.geetest.com';
    // geetest 验证接口
    // geetest server interface
    const API_URL = API_SERVER + '/validate' + '?captcha_id=' + CAPTCHA_ID;
    // 生成签名
    // Generate signature
    const hmac_sha256_encode = (value: any, key: string) => {
      const hash = crypto
        .createHmac('sha256', key)
        .update(value, 'utf8')
        .digest('hex');
      return hash;
    };
    const sign_token = hmac_sha256_encode(lot_number, CAPTCHA_KEY);
    // 向极验转发前端数据 + “sign_token” 签名
    // send web parameter and “sign_token” to geetest server
    const data = {
      lot_number: lot_number,
      captcha_output: captcha_output,
      pass_token: pass_token,
      gen_time: gen_time,
      sign_token: sign_token,
    };
    async function post_form(data: userLoginData, url: string) {
      const options = {
        url: url,
        method: 'POST',
        params: data,
        timeout: 5000,
      };
      const result = await axios(options);
      if (result.status != 200) {
        // geetest服务响应异常
        // geetest service response exception
        throw new BadRequestException('Geetest Response Error');
      }
      return result.data;
    }
    return new Promise((resolve) => {
      post_form(data, API_URL)
        .then((result) => {
          if (result['result'] == 'success') {
            const data = this.genToken({ id: user.userId });
            resolve(ResultData.ok(data));
          } else {
            throw new BadRequestException('validate fail:' + result['reason']);
          }
        })
        .catch((err) => {
          // 当请求Geetest服务接口出现异常，应放行通过，以免阻塞正常业务。
          // When the request geetest service interface is abnormal, it shall be released to avoid blocking normal business.
          throw new BadRequestException('Geetest server error:' + err);
        });
    });
  }
  async getUserDetail(username: string) {
    return this.userList.find((user) => user.username === username);
  }
  async findOneById(id: string) {
    return this.userList.find((user) => user.userId === id);
  }
  /**
   * 生成 token 与 刷新 token
   * @param payload
   * @returns
   */
  genToken(payload: { id: string }): CreateTokenDto {
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('jwt.refreshExpiresIn'),
    });
    return { accessToken, refreshToken };
  }
  /**
   * 生成刷新 token
   */
  refreshToken(id: string): string {
    return this.jwtService.sign({ id });
  }
  /** 校验 token */
  verifyToken(token: string): string {
    try {
      if (!token) return null;
      const id = this.jwtService.verify(token.replace('Bearer ', ''));
      return id;
    } catch (error) {
      return null;
    }
  }
  async updateToken(userId: string): Promise<ResultData> {
    const data = this.genToken({ id: userId });
    return ResultData.ok(data);
  }
}
