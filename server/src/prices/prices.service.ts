import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class PricesService {
  constructor() {}

  async create(createPriceDto: CreatePriceDto) {}

  findAll() {
    return `This action returns all prices`;
  }

  findOne(id: string) {
    return `This action returns a #${id} price`;
  }

  update(id: string, updatePriceDto: UpdatePriceDto) {
    return `This action updates a #${id} price`;
  }

  remove(id: string) {
    return `This action removes a #${id} price`;
  }
}
