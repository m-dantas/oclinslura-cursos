import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class SingleEmailRegister implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(value: string): Promise<boolean> {
    const userWithEmailExist = await this.userRepository.findByEmail(value);
    return !userWithEmailExist;
  }
}

export const IsUniqueEmail = (optionsValidations: ValidationOptions) => {
  return (object: object, prop: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: prop,
      options: optionsValidations,
      constraints: [],
      validator: SingleEmailRegister,
    });
  };
};
