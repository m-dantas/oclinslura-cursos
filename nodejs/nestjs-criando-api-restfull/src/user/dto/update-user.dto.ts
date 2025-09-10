import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validators/single-email-register.validator';

export class UpdateUserDTO {
  @IsOptional()
  name: string;

  @IsEmail()
  @IsUniqueEmail({ message: 'E-mail should be unique' })
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsOptional()
  password: string;
}
