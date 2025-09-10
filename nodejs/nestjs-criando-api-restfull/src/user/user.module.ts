import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SingleEmailRegister } from './validators/single-email-register.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, SingleEmailRegister],
})
export class UserModule {}
