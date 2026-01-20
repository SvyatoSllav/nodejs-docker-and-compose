import { PartialType } from '@nestjs/swagger';
import { CreateOfferDto } from './create-offer.dto';
import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @IsNumber()
  userId: number;

  @IsNumber()
  itemId: number;

  @IsNumber()
  amount: number;

  @IsBoolean()
  hidden: boolean;
}
