import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}
  /* 检查用户是否已存在 */
  async validateUser(payload: { id: string }) {
    const user = await this.userService.findOneById(payload.id); // 获取用户
    if (user) {
      const { password, ...result } = user; // 剔除 password
      return result; // 返回用户信息
    }
    return null; // 用户不存在 / 密码错误
  }
}
