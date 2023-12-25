import { IsDate, IsNumber } from 'class-validator';

export class CreateBaseDTO<T> {
  constructor(dto: Partial<T>) {
    Object.assign(this, dto);
  }
}
