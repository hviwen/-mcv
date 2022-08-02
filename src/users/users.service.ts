import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User>) {
  }

  create(email: string, password: string, name: string) {
    const user = this.repo.create({ email, password, name });
    console.log('====== create user >>>>', user);
    return this.repo.save(user);
  }

  async findOne(id: number) {
    console.log('======= findOne body id >>>', id);
    const user = await this.repo.findByIds([id]);

    if (!user) {
      throw new NotFoundException(`user not found by ${id}`);
    }

    console.log('======= findOne user >>>', user);
    return user;
  }

  find(email: string) {
    console.log('==== find email >>>', email);
    // const user = this.repo.find({ email });
    // return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findByIds([id]);

    if (!user) {
      throw new NotFoundException(`user not found by ${id}`);
    }
    return this.repo.remove(user);
  }
}
