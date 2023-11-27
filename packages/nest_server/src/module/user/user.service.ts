import * as crypto from 'crypto';
import axios from 'axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserItem, userLoginData } from 'src/core/types/user';
import { UserLoginDto } from './dto/userLogin.dto';
@Injectable()
export class UserService {
  private userList = [
    {
      id: 1,
      name: '张三',
      age: 18,
      gender: 1,
    },
  ]; // 没有数据库，暂时通过该方式定义数据
  getUserLogin(userData: UserLoginDto) {
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
    const { lot_number, captcha_output, pass_token, gen_time } = userData;
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
        console.log('Geetest Response Error, StatusCode:' + result.status);
        throw new BadRequestException('Geetest Response Error');
      }
      return result.data;
    }
    return new Promise((resolve) => {
      post_form(data, API_URL)
        .then((result) => {
          if (result['result'] == 'success') {
            resolve(this.getUserDetail('1'));
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
  getUserList(): UserItem[] {
    return this.userList;
  }
  addUser(userData: UserItem): UserItem[] {
    this.userList.push(userData);
    return this.userList;
  }
  getUserDetail(targetUserId: string): UserItem {
    const targetUserArray = this.userList.filter(
      (item) => item.id === parseInt(targetUserId),
    );
    return targetUserArray[0] || {};
  }
  updateUser(userData: UserItem): UserItem[] {
    this.userList = this.userList.map((item) => {
      if (item.id === userData.id) {
        return userData;
      }
      return item;
    });
    return this.userList;
  }
  deleteUser(deleteId): UserItem[] {
    this.userList = this.userList.filter(
      (item) => item.id !== parseInt(deleteId),
    );
    return this.userList;
  }
}
