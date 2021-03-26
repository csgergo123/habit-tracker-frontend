import { RegisterWith } from "./register-with";
export class User {
  constructor(
    public id: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public phone: string,
    private _token: string,
    public exp: Date
  ) {}

  get token() {
    if (!this.exp || new Date() > this.exp) {
      return null;
    }
    return this._token;
  }
}
