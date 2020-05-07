import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
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

  getSurvey() {
    return this.http.get(this.baseUrl + "/survey/getActive", this.headers());
  }

  loadSurveys() {
    return new Observable(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        this.baseUrl + "/survey/getActive?accessKey=" + this.accessKey
      );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            observer.next(JSON.parse(xhr.response));
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.send();
    });
  }

  deleteSurvey(id) {
    return new Observable(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        this.baseUrl +
          "/survey/delete?accessKey=" +
          this.accessKey +
          "&id=" +
          id
      );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            observer.next(JSON.parse(xhr.response));
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.send();
    });
  }

  createSurvey(name) {
    return new Observable(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        this.baseUrl +
          "/survey/create?accessKey=" +
          this.accessKey +
          "&name=" +
          name
      );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            observer.next(JSON.parse(xhr.response));
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.send();
    });
  }
}
