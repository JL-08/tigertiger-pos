import { Module } from '@nestjs/common';
import { CategoryItemsService } from './category-items.service';
import { CategoryItemsController } from './category-items.controller';
import { CategoryItem } from './entities/category-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryItem])],
  controllers: [CategoryItemsController],
  providers: [CategoryItemsService],
})
export class CategoryItemsModule {}
