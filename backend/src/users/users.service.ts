import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseService } from '../abstracts/orm/baseService';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super(userRepository, 'User not found');
  }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      data.password,
      Number(this.configService.get<number>('SALT_ROUNDS')),
    );
    return super.create({
      ...data,
      password: hashedPassword,
    });
  }

  async updateOne(
    filter: FindOptionsWhere<User>,
    data: UpdateUserDto,
  ): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(
        data.password,
        Number(this.configService.get<number>('SALT_ROUNDS')),
      );
    }

    return super.updateOne(filter, data);
  }

  async findOneWithEmailBy(id: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.email')
      .where('user.id = :id', { id })
      .getOne();
  }
}
