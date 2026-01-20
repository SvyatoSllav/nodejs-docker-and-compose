import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(filter: FindOptionsWhere<User>): Promise<User> {
    const user = this.userRepository.findOneBy(filter);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateOne(
    filter: FindOptionsWhere<User>,
    data: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy(filter);
    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async removeOne(filter: FindOptionsWhere<User>) {
    await this.userRepository.delete(filter).then((res) => {
      if (res.affected === 0) throw new NotFoundException('User not found');
    });
  }
}
