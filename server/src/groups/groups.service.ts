import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private readonly groupsRepository: Repository<Group>) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = new Group(createGroupDto);

    try {
      return await this.groupsRepository.save(group);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(`Group "${group.name}" already exists`);
      }
      throw err;
    }
  }

  async findAll() {
    return await this.groupsRepository.find();
  }

  async findOne(id: string) {
    return await this.groupsRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const existingGroup = await this.findOne(id);
    if (!existingGroup) throw new NotFoundException('Category does not exist');

    const updateGroup = {
      ...existingGroup,
      ...updateGroupDto,
      modifiedDate: new Date(),
      version: existingGroup.version + 1,
    };

    try {
      await this.groupsRepository.update(id, updateGroup);

      return updateGroup;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(`Group "${updateGroupDto.name}" already exists`);
      }
      throw err;
    }
  }

  async remove(id: string) {
    const existingGroup = await this.findOne(id);
    if (!existingGroup) throw new NotFoundException(`Group does not exist`);

    const deleteGroup = {
      ...existingGroup,
      modifiedDate: new Date(),
      version: existingGroup.version + 1,
      deletedDate: new Date(),
    };

    await this.groupsRepository.update(id, deleteGroup);

    return [];
  }
}
