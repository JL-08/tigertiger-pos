import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly categoriesRepository: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category(createCategoryDto);

    try {
      return await this.categoriesRepository.save(category);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(`Category "${category.name}" already exists`);
      }
      throw err;
    }
  }

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(id: string) {
    return await this.categoriesRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.findOne(id);
    if (!existingCategory) throw new NotFoundException('Category does not exist');

    const updateCategory = {
      ...existingCategory,
      ...updateCategoryDto,
      modifiedDate: new Date(),
      version: existingCategory.version + 1,
    };

    try {
      await this.categoriesRepository.update(id, updateCategory);

      return updateCategory;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(`Category "${updateCategoryDto.name}" already exists`);
      }
      throw err;
    }
  }

  async remove(id: string) {
    const existingCategory = await this.findOne(id);
    if (!existingCategory) throw new NotFoundException(`Category does not exist`);

    const deleteCategory = {
      ...existingCategory,
      modifiedDate: new Date(),
      version: existingCategory.version + 1,
      deletedDate: new Date(),
    };

    await this.categoriesRepository.update(id, deleteCategory);

    return [];
  }
}
