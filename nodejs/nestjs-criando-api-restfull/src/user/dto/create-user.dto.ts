import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validators/single-email-register.validator';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsUniqueEmail({ message: 'E-mail should be unique' })
  email: string;

  @MinLength(6)
  password: string;
}
