import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { MessageService } from "src/app/shared/services/message.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  public surveyUrl;
  public token;
  public user;
  public surveys;
  constructor(
    public router: Router,
    public userService: UserService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.surveyList();
  }

  public surveyList() {
    this.userService.loadSurveys().subscribe(
      data => {
        this.surveys = Object.values(data);
      },
      error => {
        console.log("error", error);
        this.messageService.showError(error);
      }
    );
  }

  delete(id, index) {
    if (confirm("Are you sure?")) {
      this.userService.deleteSurvey(id).subscribe(
        data => {
          this.messageService.showSuccess("survey deleted");
          this.surveys.splice(index, 1);
        },
        error => {
          console.log("error", error);
          this.messageService.showError(error);
        }
      );
    }
  }

  create() {
    // const surveyName = "NewSurvey" + Date.now();
    const surveyName = prompt(
      "please enter survye name",
      "NewSurvey" + Date.now()
    );
    this.userService.createSurvey(surveyName).subscribe(
      data => {
        this.messageService.showSuccess("new survey created");
        this.surveyList();
      },
      error => {
        this.messageService.showError(error);
        console.log("error", error);
      }
    );
  }
}
