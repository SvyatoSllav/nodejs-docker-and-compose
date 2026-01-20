import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { BaseService } from 'src/abstracts/orm/baseService';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishlistsService extends BaseService<
  Wishlist,
  CreateWishlistDto,
  UpdateWishlistDto
> {
  constructor(
    @InjectRepository(Wishlist)
    protected readonly entityRepository: Repository<Wishlist>,
  ) {
    super(entityRepository, 'WishlistNotFound');
  }
}
