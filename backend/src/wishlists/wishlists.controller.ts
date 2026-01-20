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
  ForbiddenException,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('wishlists')
@UseGuards(JwtGuard)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll() {
    return this.wishlistsService.findAll(['owner', 'items']);
  }

  @Post()
  create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    const user = req.user as User;
    return this.wishlistsService.create({
      ...createWishlistDto,
      owner: { id: user.id },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    const user = req.user as User;
    const wishList = await this.wishlistsService.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (user.id !== wishList.owner.id) {
      throw new ForbiddenException('Вы не являетесь владельцем вишлиста');
    }
    return this.wishlistsService.updateOne({ id }, updateWishlistDto);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    const user = req.user as User;
    const wishList = await this.wishlistsService.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (user.id !== wishList.owner.id) {
      throw new ForbiddenException('Вы не являетесь владельцем вишлиста');
    }
    return this.wishlistsService.removeOne({ id });
  }
}
