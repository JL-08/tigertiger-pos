import { Module } from '@nestjs/common';
import { CategoryItemsService } from './category-items.service';
import { CategoryItemsController } from './category-items.controller';

@Module({
  controllers: [CategoryItemsController],
  providers: [CategoryItemsService]
})
export class CategoryItemsModule {}
