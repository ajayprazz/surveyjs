import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from "@angular/forms";
import { AuthModule } from "./auth/auth.module";
import { SharedModule } from "./shared/shared.module";
import { SurveyModule } from "./survey/survey.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    AuthModule,
    SharedModule,
    SurveyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
