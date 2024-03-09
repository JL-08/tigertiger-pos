import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoryItemsService } from './category-items.service';
import { CreateCategoryItemDto } from './dto/create-category-item.dto';
import { UpdateCategoryItemDto } from './dto/update-category-item.dto';

@Controller('category-items')
export class CategoryItemsController {
  constructor(private readonly categoryItemsService: CategoryItemsService) {}

  @Post()
  create(@Body() createCategoryItemDto: CreateCategoryItemDto) {
    return this.categoryItemsService.create(createCategoryItemDto);
  }

  @Get()
  findAll() {
    return this.categoryItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryItemsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryItemDto: UpdateCategoryItemDto) {
    return this.categoryItemsService.update(+id, updateCategoryItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryItemsService.remove(+id);
  }
}
