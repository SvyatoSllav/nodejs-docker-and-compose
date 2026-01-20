import { IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  @IsString()
  link: string;

  @IsString()
  @IsUrl()
  image: string;

  @IsNumber()
  price: number;

  @IsString()
  @Length(0, 1024)
  description: string;

  @IsNumber()
  @IsOptional()
  owner: { id: number } | User;
}
