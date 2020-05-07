import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user.routing";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [UserDashboardComponent, AdminDashboardComponent],
  imports: [CommonModule, UserRoutingModule],
  providers: [UserService]
})
export class UserModule {}
