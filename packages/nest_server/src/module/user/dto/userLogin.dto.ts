import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @IsNotEmpty({ message: 'captcha_id should not be empty' })
  @IsString({ message: 'captcha_id must be a string' })
  @ApiProperty({ example: 1, description: '公钥id' })
  captcha_id: string;

  @IsNotEmpty({ message: 'lot_number should not be empty' })
  @IsString({ message: 'lot_number must be a string' })
  @ApiProperty({ example: 1, description: '密钥' })
  lot_number: string;

  @IsNotEmpty({ message: 'captcha_output should not be empty' })
  @IsString({ message: 'captcha_output must be a string' })
  @ApiProperty({ example: 1, description: '密钥' })
  captcha_output: string;

  @IsNotEmpty({ message: 'pass_token should not be empty' })
  @IsString({ message: 'pass_token must be a string' })
  @ApiProperty({ example: 1, description: '签名' })
  pass_token: string;

  @IsNotEmpty({ message: 'gen_time should not be empty' })
  @IsString({ message: 'gen_time must be a string' })
  @ApiProperty({ example: 1, description: '当前时间戳' })
  gen_time: string;
}
