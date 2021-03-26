import { RegisterWith } from "../entities/register-with";

export class CreateUserDto {
  password: string;

  firstName: string;

  lastName: string | null;

  phone: string | null;

  registerWith: RegisterWith;
}
