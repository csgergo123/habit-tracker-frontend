import { CreateUserDto } from "../models/user/dto/create-user.dto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

import { User } from "../models/user/entities/User";
import { RegisterWith } from "../models/user/entities/register-with.enum";

interface AuthResponseData {
  accessToken: string;
}

interface AuthCredentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  user = new Subject<User>();
  jwt = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<Promise<boolean>> {
    return this.http
      .post<AuthResponseData>("http://localhost:8000/users/signIn", credentials)
      .pipe(
        map(async (response) => {
          if (response && response.accessToken) {
            this.handleAuthentication(response.accessToken);

            localStorage.setItem("accessToken", response.accessToken);

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

  logout() {
    localStorage.removeItem("accessToken");
  }

  private handleAuthentication(accessToken: string) {
    const decodedJwt = this.jwt.decodeToken(accessToken);
    const expirationDate = new Date(+decodedJwt.exp);

    const user = new User(
      decodedJwt.id,
      decodedJwt.email,
      decodedJwt.firstName,
      decodedJwt.lastName,
      decodedJwt.phone,
      "token",
      expirationDate
    );

    this.user.next(user);
    console.log("this.user", this.user);
    console.log("user", user);
  }

  private tokenNotExpire(token: string) {
    return !this.jwt.isTokenExpired(token);
  }

  private decodeToken(token: string) {
    return this.jwt.decodeToken(token);
  }

  getAccessToken() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return null;
    }
    if (!this.tokenNotExpire(token)) {
      return null;
    }
    return token;
  }

  get currentUser() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return null;
    }
    if (!this.tokenNotExpire(token)) {
      return null;
    }
    return this.decodeToken(token);
  }
}
