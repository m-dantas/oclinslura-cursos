import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListUserDTO } from "./dto/list-user.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository:  Repository<UserEntity>
  ){}

  async getAllUsers () {
    const users = await this.userRepository.find()
    const usersMapped = users.map((user) => new ListUserDTO(user.id, user.name))
    
    return usersMapped
  }

  async createUser (user: UserEntity) {
    await this.userRepository.save(user)
  }

  async updateUser(id: string, user: UpdateUserDTO) {
    await this.userRepository.update(id, user)
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id)
  }
}