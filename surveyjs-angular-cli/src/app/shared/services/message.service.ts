import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class MessageService {
  constructor(public toastr: ToastrService) {}

  showMessage(msg) {
    this.toastr.show(msg);
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }

  showInfo(msg) {
    this.toastr.info(msg);
  }

  showError(err: any) {
    this.toastr.error(err.message);
  }
}
