import { BadRequestException, ConflictException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { GroupsService } from 'src/groups/groups.service';
import { Price } from 'src/prices/entities/price.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly groupsService: GroupsService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existingGroup = await this.groupsService.findOne(createProductDto.group);
    if (!existingGroup) throw new NotFoundException(`Group does not exist`);

    if ((createProductDto.categories && createProductDto.price) || (!createProductDto.categories && !createProductDto.price))
      throw new BadRequestException('Product should either have a price or an assigned category');

    let categoryList: Category[] | null = null;
    if (createProductDto.categories) categoryList = createProductDto.categories.map((c) => new Category(c));

    try {
      const product = new Product({ ...createProductDto, group: existingGroup, categories: categoryList });
      return await this.productsRepository.save(product);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(`Product "${createProductDto.name}" already exists`);
      }
      throw err;
    }
  }

  async findAll() {
    return await this.productsRepository.find({ where: { deletedDate: null } });
  }

  async findOne(id: string) {
    return await this.productsRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.productsRepository.findOne({ where: { id: id }, relations: { categories: true } });
    if (!existingProduct) throw new NotFoundException('Product does not exist');

    const group = updateProductDto.group ?? existingProduct.group.id;
    const existingGroup = await this.groupsService.findOne(group);
    if (!existingGroup) throw new NotFoundException('Group does not exist');

    if ((updateProductDto.categories && updateProductDto.price) || (!updateProductDto.categories && !updateProductDto.price))
      throw new BadRequestException('Product should either have a price or an assigned category');

    let categoryList: Category[] | null = null;
    if (updateProductDto.categories) {
      categoryList = updateProductDto.categories.map((c) => new Category(c));
      existingProduct.price = null;
    }

    const updateProduct = {
      ...existingProduct,
      ...updateProductDto,
      categories: categoryList,
      group: existingGroup,
      modifiedDate: new Date(),
      version: existingProduct.version + 1,
    };

    await this.productsRepository.update(id, updateProduct);

    return updateProduct;
  }

  async remove(id: string) {
    const existingProduct = await this.findOne(id);
    if (!existingProduct) throw new NotFoundException('Product does not exist');

    const deleteProduct = {
      ...existingProduct,
      modifiedDate: new Date(),
      version: existingProduct.version + 1,
      deletedDate: new Date(),
    };

    await this.productsRepository.update(id, deleteProduct);

    return [];
  }
}
