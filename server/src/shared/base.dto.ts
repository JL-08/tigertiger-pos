export class BaseDTO<T> {
  constructor(dto: Partial<T>) {
    Object.assign(this, dto);
  }
}
