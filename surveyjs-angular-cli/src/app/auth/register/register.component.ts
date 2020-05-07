import { Component, OnInit } from "@angular/core";
import { User, AuthService } from "./../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "src/app/shared/services/message.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public user;
  constructor(
    public authervice: AuthService,
    public router: Router,
    public messageService: MessageService
  ) {
    this.user = new User();
  }

  ngOnInit() {}

  register() {
    this.authervice.register(this.user).subscribe(
      data => {
        this.router.navigate(["/auth/login"]);
        this.messageService.showSuccess("registration successfull");
      },
      error => {
        // console.log("error", error);
        this.messageService.showError(error);
      }
    );
  }
}
