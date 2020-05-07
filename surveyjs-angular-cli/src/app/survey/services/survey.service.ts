import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class SurveyService {
  public baseUrl = "http://localhost:3000";
  public accessKey = "";
  // public availableSurveys = ko.observableArray();

  constructor(public http: HttpClient) {}

  headers() {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return options;
  }

  getSurvey(id) {
    return this.http.get(
      this.baseUrl + "/survey/getSurvey?surveyId=" + id,
      this.headers()
    );
  }

  saveSurvey(id, json) {
    return new Observable(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        this.baseUrl + "/survey/changeJson?accessKey=" + this.accessKey
      );
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            observer.next(xhr.response);
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.send(
        JSON.stringify({
          Id: id,
          Json: json
        })
      );
    });
  }

  submitResult(options, result) {
    return new Observable(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", this.baseUrl + "/survey/post");
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            observer.next(xhr.response);
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.send(
        JSON.stringify({
          userId: options.userId,
          surveyId: options.surveyId,
          obtainedScore: options.obtainedScore,
          totalScore: options.totalScore,
          startTime: options.startTime,
          endTime: options.endTime,
          result: result
        })
      );
    });
  }

  loadResults(surveyId) {
    return this.http.get(
      this.baseUrl + "/survey/results?surveyId=" + surveyId,
      this.headers()
    );
  }

  getUser(userId) {
    return this.http.get(this.baseUrl + "/user/" + userId, this.headers());
  }
}
