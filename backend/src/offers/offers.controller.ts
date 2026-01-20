import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Controller('offers')
@UseGuards(JwtGuard)
export class OffersController {
  constructor(
    private service: OffersService,
    private wishesService: WishesService,
  ) {}

  @Post()
  async createOffer(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    const user = req.user as User;
    return this.service.create({ ...createOfferDto, userId: user.id });
  }

  @Get()
  getAllOffers() {
    return this.service.findAll();
  }

  @Get(':id')
  getOfferById(@Param('id') id: number) {
    return this.service.findOne({
      where: { id },
      relations: [
        'user',
        'user.wishes',
        'user.offers',
        'user.wishlists',
        'user.wishlists.owner',
        'user.wishlists.items',
      ],
    });
  }
}
