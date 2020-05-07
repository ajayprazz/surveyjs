export class User {
  public name: string;
  public email: string;
  public password: string;

  constructor() {}

  //   constructor(options) {
  //     for (let key in options) {
  //       this[key] = options[key] || "";
  //     }
  //   }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {
  public baseUrl = "http://localhost:3000";

  constructor(public http: HttpClient) {}

  headers() {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return options;
  }

  register(data: User) {
    return this.http.post(
      this.baseUrl + "/auth/register",
      data,
      this.headers()
    );
  }

  login(data: any) {
    return this.http.post(this.baseUrl + "/auth/login", data, this.headers());
  }

  isAuthorized(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;
    if (role == 1) {
      return true;
    } else {
      return false;
    }
  }
}
