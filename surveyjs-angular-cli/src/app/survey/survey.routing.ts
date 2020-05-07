import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SurveyEditorComponent } from "./survey-editor/survey-editor.component";
import { SurveyComponent } from "./survey/survey.component";
import { AuthGuard } from "../auth/auth.guard";
import { ResultComponent } from "./result/result.component";

const surveyRoute: Routes = [
  {
    path: "survey/:id",
    component: SurveyComponent
  },
  {
    path: "survey-editor/:id",
    component: SurveyEditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "result/:id",
    component: ResultComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(surveyRoute)],
  exports: [RouterModule]
})
export class SurveyRoutingModule {}
