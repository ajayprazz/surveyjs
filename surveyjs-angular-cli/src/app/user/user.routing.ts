import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AuthGuard } from "../auth/auth.guard";

const userRoute: Routes = [
  {
    path: "user-dashboard",
    component: UserDashboardComponent
  },
  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoute)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
