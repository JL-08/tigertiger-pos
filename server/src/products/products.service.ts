import { ConflictException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Price } from 'src/prices/entities/price.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existingCategory = await this.categoriesService.findOne(createProductDto.category);
    if (!existingCategory) throw new NotFoundException(`Category does not exist`);

    const priceList: Price[] = createProductDto.prices.map((p) => new Price(p));
    try {
      const product = new Product({ ...createProductDto, category: existingCategory, prices: priceList });
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
    const existingProduct = await this.findOne(id);
    if (!existingProduct) throw new NotFoundException('Product does not exist');

    const category = updateProductDto.category ?? existingProduct.category.id;
    const existingCategory = await this.categoriesService.findOne(category);
    if (!existingCategory) throw new NotFoundException('Category does not exist');

    const updateProduct = {
      ...existingProduct,
      ...updateProductDto,
      category: existingCategory,
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
