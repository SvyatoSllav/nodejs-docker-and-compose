import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService, // private configService: ConfigService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(userName: string, password: string) {
    const user = await this.usersService.findOne({
      where: { username: userName },
      select: { password: true },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  signup(user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
