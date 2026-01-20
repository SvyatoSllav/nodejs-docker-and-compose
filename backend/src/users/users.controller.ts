import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtGuard } from '../auth/jwt.guard';
import { WishesService } from 'src/wishes/wishes.service';
import { ILike } from 'typeorm';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(
    protected usersService: UsersService,
    protected wishesService: WishesService,
  ) {}

  @Get('me')
  findMe(@Req() req) {
    const user = req.user as User;
    return this.usersService.findOneWithEmailBy(user.id);
  }

  @Patch('me')
  async patchMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user as User;
    const updatedUser = await this.usersService.updateOne(
      { id: user.id },
      updateUserDto,
    );
    delete updatedUser.password;
    return updatedUser;
  }

  @Get('me/wishes')
  findMyWishes(@Req() req) {
    const user = req.user as User;
    return this.wishesService.find({
      where: { owner: { id: user.id } },
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

  @Get(':username')
  findByName(@Param('username') username: string) {
    return this.usersService.findOneBy({ username: username });
  }

  @Get(':username/wishes')
  async findWishesByName(@Param('username') username: string) {
    const user = await this.usersService.findOneBy({ username: username });
    return this.wishesService.find({
      where: { owner: { id: user.id } },
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

  @Post('find')
  findMany(@Body() { query }: { query: string }) {
    return this.usersService.find({
      where: [
        { username: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
      ],
    });
  }
}
