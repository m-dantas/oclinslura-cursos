import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    await this.userService.createUser(userEntity);

    return {
      message: 'User was created',
    };
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();

    return {
      users,
      message: null
    };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDTO) {
    await this.userService.updateUser(id, updateData);

    return {
      message: 'User was updated',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id)

    return {
      message: 'User was deleted',
    };
  }
}
