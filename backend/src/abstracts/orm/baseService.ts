import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseEntity } from './baseEntity';

export abstract class BaseService<
  Entity extends BaseEntity,
  CreateDto extends DeepPartial<Entity>,
  UpdateDto extends DeepPartial<Entity>,
> {
  constructor(
    protected readonly entityRepository: Repository<Entity>,
    protected notFoundMessage = 'Entity not found',
  ) {}

  async create(data: CreateDto): Promise<Entity> {
    const entity = this.entityRepository.create(data);
    return this.entityRepository.save(entity);
  }

  async findAll(relations: string[] = []): Promise<Entity[]> {
    return this.entityRepository.find({
      relations,
    });
  }

  async findOneBy(filter: FindOptionsWhere<Entity>): Promise<Entity> {
    const entity = await this.entityRepository.findOneBy(filter);
    if (!entity) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return entity;
  }

  async findOne(filter: FindOneOptions<Entity>): Promise<Entity> {
    const entity = await this.entityRepository.findOne(filter);
    if (!entity) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return entity;
  }

  async findBy(filter: FindOptionsWhere<Entity>): Promise<Entity[]> {
    const entity = await this.entityRepository.findBy(filter);
    // if (!entity.length) {
    //   throw new NotFoundException(this.notFoundMessage);
    // }
    return entity;
  }

  async find(filter: FindManyOptions<Entity>): Promise<Entity[]> {
    const entity = await this.entityRepository.find(filter);
    // if (!entity.length) {
    //   throw new NotFoundException(this.notFoundMessage);
    // }
    return entity;
  }

  async updateOne(
    filter: FindOptionsWhere<Entity>,
    data: UpdateDto,
  ): Promise<Entity> {
    const entity = await this.entityRepository.findOneBy(filter);
    Object.assign(entity, data);
    return this.entityRepository.save(entity);
  }

  async removeOne(filter: FindOptionsWhere<Entity>) {
    await this.entityRepository.delete(filter).then((res) => {
      if (res.affected === 0) throw new NotFoundException(this.notFoundMessage);
    });
  }
}
