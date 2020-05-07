import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const appRoute: Routes = [
  {
    path: "",
    redirectTo: "/auth/login",
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule"
  },
  {
    path: "survey",
    loadChildren: "./survey/survey.module#SurveyModule"
  },
  {
    path: "user",
    loadChildren: "./user/user.module#UserModule"
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoute, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
