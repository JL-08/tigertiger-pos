import { PartialType } from '@nestjs/swagger';
import { CreateCategoryItemDto } from './create-category-item.dto';

export class UpdateCategoryItemDto extends PartialType(CreateCategoryItemDto) {}
