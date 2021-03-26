import { RegisterWith } from "../entities/register-with.enum";

export class CreateUserDto {
  password: string;

  firstName: string;

  lastName: string | null;

  phone: string | null;

  registerWith: RegisterWith;
}
