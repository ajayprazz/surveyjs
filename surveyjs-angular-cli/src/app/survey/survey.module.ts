import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SurveyComponent } from "./survey/survey.component";
import { SurveyEditorComponent } from "./survey-editor/survey-editor.component";
import { SurveyRoutingModule } from "./survey.routing";
import { SurveyService } from "./services/survey.service";
import { ResultComponent } from "./result/result.component";

@NgModule({
  declarations: [SurveyComponent, SurveyEditorComponent, ResultComponent],
  imports: [CommonModule, SurveyRoutingModule],
  providers: [SurveyService]
})
export class SurveyModule {}
