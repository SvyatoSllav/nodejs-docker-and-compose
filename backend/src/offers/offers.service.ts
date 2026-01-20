import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { BaseService } from '../abstracts/orm/baseService';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService extends BaseService<
  Offer,
  CreateOfferDto,
  UpdateOfferDto
> {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {
    super(offerRepository, 'Offer not found');
  }

  async create(data: CreateOfferDto) {
    const wish = await this.wishesService.findOne({
      select: ['owner'],
      where: { id: data.itemId },
      relations: ['owner'],
    });
    if (wish.owner.id === data.userId) {
      throw new BadRequestException('Нельзя скидываться на свои подарки');
    }
    await this.wishesService.raise(data.itemId, data.amount);
    return super.create(data);
  }
}
