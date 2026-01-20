import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  image: string;

  @IsArray()
  itemsId: number[];

  @IsNumber()
  @IsOptional()
  owner: { id: number } | User;
}
