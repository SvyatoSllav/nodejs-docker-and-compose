import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
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
  email: string;

  @IsString()
  password: string;
}
