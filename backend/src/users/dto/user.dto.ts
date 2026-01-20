import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @IsString()
  @Length(200)
  about: string;

  @IsString()
  @IsUrl()
  avatar: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  wishIds: number[];

  @IsArray()
  offerIds: number[];

  @IsArray()
  wishlistIds: number[];
}
