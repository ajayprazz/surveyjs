import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { MessageService } from "src/app/shared/services/message.service";
import { SurveyService } from "src/app/survey/services/survey.service";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"]
})
export class UserDashboardComponent implements OnInit {
  public surveys;
  public user = JSON.parse(localStorage.getItem("user"));

  constructor(
    public userService: UserService,
    public messageService: MessageService,
    public surveyService: SurveyService
  ) {}

  ngOnInit() {
    //get list of all available surveys
    this.userService.getSurvey().subscribe(
      (data: any) => {
        this.surveys = Object.values(data);
        //get list of results for each survey
        this.surveys.forEach(survey => {
          this.surveyService.loadResults(survey.id).subscribe(
            (data: any) => {
              data.forEach(result => {
                //if user has already taken the survey, remove the survey from the list of available surveys
                if (result.userId == this.user.id) {
                  this.surveys.splice(this.surveys.indexOf(survey), 1);
                }
              });
            },
            error => {
              console.log("error", error);
            }
          );
        });
      },
      error => {
        this.messageService.showError(error);
        console.log("error", error);
      }
    );
  }
}
