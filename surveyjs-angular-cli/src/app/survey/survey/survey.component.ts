import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";
import * as Survey from "survey-angular";
import * as widgets from "surveyjs-widgets";

import "inputmask/dist/inputmask/phone-codes/phone.js";
import { SurveyService } from "../services/survey.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "src/app/shared/services/message.service";

widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);

Survey.JsonObject.metaData.addProperty("questionbase", "popupdescription:text");
Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");
Survey.JsonObject.metaData.addProperty("question", { name: "score:number" });

@Component({
  // tslint:disable-next-line:component-selector
  selector: "survey",
  template: `
    <div class="survey-container contentcontainer codecontainer">
      <div id="surveyElement"></div>
    </div>
  `
})
export class SurveyComponent implements OnInit {
  @Output() submitSurvey = new EventEmitter<any>();

  @Input()
  json: object;

  click(result) {
    console.log(result);
  }
  public id;
  public user = JSON.parse(localStorage.getItem("user"));
  public takenSurvey: boolean = false;
  public startTime;
  public endTime;
  public score: number = 0;
  public totalScore: number = 0;

  constructor(
    public surveyService: SurveyService,
    public activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    public router: Router
  ) {}

  ngOnInit() {
    const css = {
      root: "sv_main sv_frame sv_default_css"
    };
    this.id = this.activatedRoute.snapshot.params.id;

    this.startTime = this.getCurrentDateTimeMySql();

    this.surveyService.loadResults(this.id).subscribe(
      data => {
        Object.values(data).forEach(element => {
          if (element.userId == this.user.id) {
            this.takenSurvey = true;
          }
        });
        if (!this.takenSurvey) {
          this.surveyService.getSurvey(this.id).subscribe(
            (data: any) => {
              this.json = data.json;
              const surveyModel = new Survey.Model(this.json);

              surveyModel.onComplete.add(result => {
                if (this.user.role == 2) {
                  this.endTime = this.getCurrentDateTimeMySql();

                  const questions = result.getAllQuestions();
                  questions.forEach(question => {
                    this.totalScore = this.totalScore + question["score"];
                    if (question.isAnswerCorrect()) {
                      this.score = this.score + question["score"];
                    }
                  });

                  const options = {
                    userId: this.user.id,
                    surveyId: this.id,
                    obtainedScore: this.score,
                    totalScore: this.totalScore,
                    startTime: this.startTime,
                    endTime: this.endTime
                  };

                  this.surveyService
                    .submitResult(options, result.data)
                    .subscribe(
                      data => {
                        this.messageService.showSuccess("result submitted");
                      },
                      error => {
                        console.log("error", error);
                        this.messageService.showError(error);
                      }
                    );
                } else {
                  console.log("questions", result.getAllQuestions());
                }
              });
              Survey.SurveyNG.render("surveyElement", { model: surveyModel });
            },
            error => {
              this.messageService.showError(error);
              console.log("error", error);
            }
          );
        } else {
          this.router.navigate(["/user/user-dashboard"]);
          this.messageService.showInfo("you have already taken this survey");
        }
      },
      error => {
        console.log("error", error);
      }
    );
  }

  getCurrentDateTimeMySql() {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    return new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  }
}
