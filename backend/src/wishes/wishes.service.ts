import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { BaseService } from '../abstracts/orm/baseService';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService extends BaseService<
  Wish,
  CreateWishDto,
  UpdateWishDto
> {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {
    super(wishRepository, 'WishNotFound');
  }

  async copy(data: Wish, newOwner: User) {
    this.wishRepository.increment({ id: data.id }, 'copied', 1);
    return super.create({
      name: data.name,
      link: data.link,
      image: data.image,
      description: data.description,
      price: data.price,
      owner: newOwner,
    });
  }

  async raise(id: number, diff: number) {
    const wish = await this.wishRepository.findOneBy({ id });
    const newRaised = Number(diff) + Number(wish.raised);
    if (newRaised > wish.price) {
      throw new BadRequestException(
        'Сумма пожертвований не должна превышать стоимость подарка',
      );
    }
    return this.wishRepository.update(id, {
      ...wish,
      raised: newRaised,
    });
  }
}
