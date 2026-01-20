import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsNumber()
  amount: number;

  @IsBoolean()
  hidden: boolean;
}
