import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from './local.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    // let user = await this.usersService.findOneBy({
    //   username: createUserDto.username,
    // });

    // if (user) {
    //   throw new ConflictException(
    //     'Пользователь с данным логином уже существует',
    //   );
    // }

    // user = await this.usersService.findOneBy({
    //   email: createUserDto.email,
    // });

    // if (user) {
    //   throw new ConflictException('Данный email уже зарегистрирован в системе');
    // }
    try {
      const newUser = await this.usersService.create(createUserDto);
      return this.authService.auth(newUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(
          'Данный логин или email уже зарегистрирован в системе',
        );
      }
      throw new InternalServerErrorException();
    }
  }
}
