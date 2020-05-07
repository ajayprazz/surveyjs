import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SurveyService } from "../services/survey.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
  public id;
  public results;
  public surveyName;
  constructor(
    public activatedRoute: ActivatedRoute,
    public surveyService: SurveyService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.surveyService.getSurvey(this.id).subscribe(
      (data: any) => {
        this.surveyName = data.name;
      },
      error => {
        console.log("error", error);
      }
    );
    this.surveyService.loadResults(this.id).subscribe(
      data => {
        this.results = data;
        this.results.forEach(element => {
          element.startTime = new Date(element.startTime);
          element.endTime = new Date(element.endTime);
          this.surveyService.getUser(element.userId).subscribe(
            (data: any) => {
              element.userEmail = data[0].email;
            },
            error => {
              console.log("error", error);
            }
          );
        });
      },
      error => {
        console.log("error", error);
      }
    );
  }
}
