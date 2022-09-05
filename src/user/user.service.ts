import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.fname = createUserDto.fname;
    user.lname = createUserDto.lname;
    user.age = createUserDto.age;
    return this.userRepository.save(user);
    //save returns a promise
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  // findUserByAge(age: number) {
  //   return this.userRepository.findUserByAge(age);
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    user.fname = updateUserDto.fname;
    user.lname = updateUserDto.lname;
    user.age = updateUserDto.age;
    user.id = id;
    return this.userRepository.save(user);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
