import { CreateUserDto } from "./../models/user/dto/create-user.dto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user/entities/User";
import { RegisterWith } from "../models/user/entities/register-with";

interface AuthResponseData {
  accessToken: string;
}

interface AuthCredentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<Promise<boolean>> {
    return this.http
      .post<AuthResponseData>("http://localhost:8000/users/signIn", credentials)
      .pipe(
        map(async (response) => {
          if (response && response.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);

            //let jwt = new JwtHelper();
            //this.currentUser = jwt.decodeToken(localStorage.getItem('accessToken'));

            return true;
          } else return false;
        })
      );
  }

  register(createUserDto: CreateUserDto): Observable<User> {
    createUserDto.registerWith = RegisterWith.email;

    return this.http.post<User>(
      "http://localhost:8000/users/signUp",
      createUserDto
    );
  }
}
