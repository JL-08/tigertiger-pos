import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const user = new User(createUserDto);

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  findById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findById(id);
    if (!existingUser) throw new BadRequestException('User does not exist');

    const updateUser = {
      ...existingUser,
      ...updateUserDto,
    };

    await this.usersRepository.save(updateUser);

    return updateUser;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
