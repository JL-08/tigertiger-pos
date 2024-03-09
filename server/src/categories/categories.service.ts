import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryItem } from 'src/category-items/entities/category-item.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    let categoryItemList: CategoryItem[] | null = null;
    if (createCategoryDto.categoryItems) categoryItemList = createCategoryDto.categoryItems.map((ci) => new CategoryItem(ci));

    const category = new Category({ ...createCategoryDto, categoryItems: categoryItemList });
    return await this.categoriesRepository.save(category);
  }

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(id: string) {
    return await this.categoriesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.findOne(id);
    if (!existingCategory) throw new NotFoundException('Category does not exist');

    const updateCategory = {
      ...existingCategory,
      ...updateCategoryDto,
    };

    await this.categoriesRepository.update(id, updateCategory);

    return updateCategory;
  }

  async remove(id: string) {
    const existingCategory = await this.findOne(id);
    if (!existingCategory) throw new NotFoundException('Category does not exist');

    await this.categoriesRepository.softDelete(id);

    return [];
  }
}
