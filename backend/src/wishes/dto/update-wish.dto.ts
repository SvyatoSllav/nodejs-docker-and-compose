import { PartialType } from '@nestjs/swagger';
import { CreateWishDto } from './create-wish.dto';
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class UpdateWishDto extends PartialType(CreateWishDto) {
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
}
