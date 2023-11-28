import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { GetUserDetailDto } from './dto/getUserDetail.dto';
import { AddUserDto } from './dto/addUser.dto';
import { SUCCESS_RES, ERROR_RES } from 'src/core/utils/resWrapper.util';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserItem } from 'src/core/types/user';
import { Response } from 'express';
@Controller('/user')
@ApiTags('用户相关接口')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('userLogin')
  @ApiOperation({
    summary: '用户登录',
  })
  @ApiResponse({
    status: 200,
    description: '成功返回200',
    schema: {
      type: 'object',
      example: {
        data: {
          id: 1,
          name: '张三',
          age: 18,
          gender: 1,
        },
        msg: 'success',
        code: 200,
      },
    },
  })
  async userLogin(
    @Body() userData: UserLoginDto,
    @Res() res: Response,
  ): Promise<void> {
    const targetUser = await this.userService.getUserLogin(userData);
    if (targetUser) {
      res.status(200).json(SUCCESS_RES(targetUser));
    } else {
      res.status(404).json(ERROR_RES('User was not found'));
    }
  }
  @Post('getUserPhoneCode')
  @ApiOperation({
    summary: '发送短信',
  })
  @ApiResponse({
    status: 200,
    description: '成功返回200',
    schema: {
      type: 'object',
      example: {
        data: 123456,
        msg: 'success',
        code: 200,
      },
    },
  })
  getUserPhoneCode(@Body() phoneCodeData, @Res() res: Response) {
    const targetUser = this.userService.getUserPhoneCode();
    if (targetUser) {
      res.status(200).json(SUCCESS_RES(targetUser));
    } else {
      res.status(404).json(ERROR_RES('User was not found'));
    }
  }

  @Get('getUserDetail/:id')
  @ApiOperation({
    summary: '获取用户详情',
  })
  @ApiResponse({
    status: 200,
    description: '成功返回200',
    schema: {
      type: 'object',
      example: {
        data: {
          id: 1,
          name: '张三',
          age: 18,
          gender: 1,
        },
        msg: 'success',
        code: 200,
      },
    },
  })
  getUserDetail(
    @Param('id', GetUserDetailDto) id: string,
    @Res() res: Response,
  ): void {
    const targetUser = this.userService.getUserDetail(id);
    if (targetUser) {
      res.status(200).json(SUCCESS_RES(targetUser));
    } else {
      res.status(404).json(ERROR_RES('User was not found'));
    }
  }

  @Post('addUser')
  @ApiOperation({
    summary: '获取用户列表',
    // description: '获取所有的用户列表',
  })
  @ApiResponse({
    status: 200,
    description: '成功返回200',
    schema: {
      type: 'array',
      example: [
        {
          id: 1,
          name: '张三',
          age: 18,
          gender: 1,
        },
      ],
    },
  })
  addUser(@Body() userData: AddUserDto): UserItem[] {
    return this.userService.addUser(userData);
  }
}
