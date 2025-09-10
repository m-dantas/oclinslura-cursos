import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { randomUUID } from 'crypto';
import { ListUserDTO } from './dto/list-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.id = randomUUID();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    this.userRepository.save(userEntity);

    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'User was created',
    };
  }

  @Get()
  listUser() {
    const users = this.userRepository.findMany();
    const userWithOutSensiveData = users.map(
      (user) => new ListUserDTO(user.id, user.name),
    );

    return userWithOutSensiveData;
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDTO) {
    const user = this.userRepository.update(id, updateData);

    return {
      user,
      message: 'User was updated',
    };
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    const user = this.userRepository.delete(id);

    return {
      user: new ListUserDTO(user.id, user.name),
      message: 'User was deleted',
    };
  }
}
