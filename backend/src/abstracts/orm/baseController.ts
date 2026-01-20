import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseService } from './baseService';
import { DeepPartial } from 'typeorm';
import { BaseEntity } from './baseEntity';

export function createBaseController<
  Entity extends BaseEntity,
  CreateDto extends DeepPartial<Entity>,
  UpdateDto extends DeepPartial<Entity>,
>() {
  class BaseController {
    constructor(
      public service: BaseService<BaseEntity, CreateDto, UpdateDto>,
    ) {}

    @Get()
    findAll() {
      return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.service.findOneBy({ id });
    }

    @Post()
    create(@Body() dto: CreateDto) {
      return this.service.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateDto) {
      return this.service.updateOne({ id: +id }, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.service.removeOne({ id: +id });
    }
  }

  return BaseController;
}
