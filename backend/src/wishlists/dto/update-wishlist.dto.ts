import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class UpdateWishlistDto {
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
