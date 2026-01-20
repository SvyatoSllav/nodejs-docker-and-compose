import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(2, 30)
  @IsOptional()
  username: string;

  @IsString()
  @Length(0, 200)
  @IsOptional()
  about: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
