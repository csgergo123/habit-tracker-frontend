import { RegisterWith } from "./register-with";

export class User {
  email: string;

  password: string;

  firstName: string;

  lastName: string | null;

  phone: string | null;

  registerWith: RegisterWith;

  emailVerifiedAt: Date | null;
}
