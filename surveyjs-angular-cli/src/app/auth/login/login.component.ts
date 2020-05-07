import { Component, OnInit } from "@angular/core";
import { User, AuthService } from "../services/auth.service";
import { MessageService } from "./../../shared/services/message.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public user;
  constructor(
    public authService: AuthService,
    public messageService: MessageService,
    public router: Router
  ) {
    this.user = new User();
  }

  ngOnInit() {}

  login() {
    this.authService.login(this.user).subscribe(
      (data: any) => {
        this.messageService.showSuccess("login successfull");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.role == 1) {
          this.router.navigate(["/user/admin-dashboard"]);
        } else {
          this.router.navigate(["/user/user-dashboard"]);
        }
      },
      error => {
        this.messageService.showError(error);
        console.log("error", error);
      }
    );
  }
}
