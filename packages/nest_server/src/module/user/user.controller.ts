import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

import { UserService } from './user.service';
import { ResultData } from '../../common/utils/result';

import { AllowAnon } from '../../common/decorators/allow-anon.decorator';
import { ApiResult } from '../../common/decorators/api-result.decorator';

import { LoginUserDto } from './dto/login-user.dto';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('/user')
@ApiTags('用户相关接口')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('userLogin')
  @ApiOperation({
    summary: '用户登录',
  })
  @ApiResult(CreateTokenDto)
  @AllowAnon()
  async userLogin(@Body() userData: LoginUserDto): Promise<ResultData> {
    return await this.userService.getUserLogin(userData);
  }

  @Post('updateToken')
  @ApiOperation({ summary: '刷新token' })
  @ApiResult(CreateTokenDto)
  @ApiBearerAuth()
  async updateToken(@Req() req): Promise<ResultData> {
    return await this.userService.updateToken(req.user.id);
  }
}
