import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 1, description: '公钥id' })
  @IsNotEmpty({ message: 'captcha_id should not be empty' })
  @IsString({ message: 'captcha_id must be a string' })
  readonly captcha_id: string;

  @ApiProperty({ example: 1, description: '密钥' })
  @IsNotEmpty({ message: 'lot_number should not be empty' })
  @IsString({ message: 'lot_number must be a string' })
  readonly lot_number: string;

  @ApiProperty({ example: 1, description: '密钥' })
  @IsNotEmpty({ message: 'captcha_output should not be empty' })
  @IsString({ message: 'captcha_output must be a string' })
  readonly captcha_output: string;

  @ApiProperty({ example: 1, description: '签名' })
  @IsNotEmpty({ message: 'pass_token should not be empty' })
  @IsString({ message: 'pass_token must be a string' })
  readonly pass_token: string;

  @ApiProperty({ example: 1, description: '当前时间戳' })
  @IsNotEmpty({ message: 'gen_time should not be empty' })
  @IsString({ message: 'gen_time must be a string' })
  readonly gen_time: string;

  @ApiProperty({ example: 1, description: '登录用户名' })
  @IsNotEmpty({ message: 'username should not be empty' })
  @IsString({ message: 'username must be a string' })
  readonly username: string;

  @ApiProperty({ example: 1, description: '登录密码' })
  @IsNotEmpty({ message: 'password should not be empty' })
  @IsString({ message: 'password must be a string' })
  readonly password: string;
}
