import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('wishes')
export class WishesController {
  constructor(public service: WishesService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() dto: CreateWishDto, @Req() req) {
    const user = req.user as User;
    return this.service.create({ ...dto, owner: { id: user.id } });
  }

  @Get('last')
  findLast() {
    return this.service.find({
      relations: ['owner'],
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  @Get('top')
  findTop() {
    return this.service.find({
      relations: ['owner'],
      order: { copied: 'DESC' },
      take: 20,
    });
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number) {
    return this.service.findOne({
      where: { id },
      relations: [
        'owner',
        'offers',
        'offers.user',
        'offers.user.wishes',
        'offers.user.offers',
        'offers.user.wishlists',
        'offers.user.wishlists.owner',
        'offers.user.wishlists.items',
      ],
    });
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async patchWish(
    @Req() req,
    @Body() updateWishDto: UpdateWishDto,
    @Param('id') id: number,
  ) {
    const user = req.user as User;
    const wish = await this.service.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (wish.owner.id === user.id) {
      throw new ForbiddenException('Вы не являетесь владельцем подарка');
    }
    if (wish.raised > 0) {
      throw new BadRequestException('На подарок уже скинулись');
    }
    return await this.service.updateOne({ id }, updateWishDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteWish(@Req() req, @Param('id') id: number) {
    const user = req.user as User;
    const wish = await this.service.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (wish.owner.id !== user.id) {
      throw new ForbiddenException('Вы не являетесь владельцем подарка');
    }
    if (wish.raised > 0) {
      throw new BadRequestException('На подарок уже скинулись');
    }
    await this.service.removeOne({ id });
    return wish;
  }

  @Post(':id/copy')
  @UseGuards(JwtGuard)
  async copyWish(@Req() req, @Param('id') id: number) {
    const user = req.user as User;
    const wish = await this.service.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (user.id === wish.owner.id) {
      throw new BadRequestException(
        'Вы уже являяетесь владельцем этого подарка',
      );
    }
    return this.service.copy(wish, user);
  }
}
