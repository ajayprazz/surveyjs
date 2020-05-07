import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as SurveyKo from "survey-knockout";
import * as SurveyEditor from "surveyjs-editor";
import * as widgets from "surveyjs-widgets";
import * as Survey from "survey-angular";

import "inputmask/dist/inputmask/phone-codes/phone.js";
import { SurveyService } from "../services/survey.service";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "src/app/shared/services/message.service";

widgets.icheck(SurveyKo);
widgets.select2(SurveyKo);
widgets.inputmask(SurveyKo);
// widgets.jquerybarrating(SurveyKo);
// widgets.jqueryuidatepicker(SurveyKo);
// widgets.nouislider(SurveyKo);
// widgets.select2tagbox(SurveyKo);
// widgets.signaturepad(SurveyKo);
// widgets.sortablejs(SurveyKo);
// widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo);
// widgets.bootstrapslider(SurveyKo);

Survey.JsonObject.metaData.addProperty("question", { name: "score:number" });

var CkEditor_ModalEditor = {
  afterRender: function(modalEditor, htmlElement) {
    var editor = window["CKEDITOR"].replace(htmlElement);
    editor.on("change", function() {
      modalEditor.editingValue = editor.getData();
    });
    editor.setData(modalEditor.editingValue);
  },
  destroy: function(modalEditor, htmlElement) {
    var instance = window["CKEDITOR"].instances[htmlElement.id];
    if (instance) {
      instance.removeAllListeners();
      window["CKEDITOR"].remove(instance);
    }
  }
};
SurveyEditor.SurveyPropertyModalEditor.registerCustomWidget(
  "html",
  CkEditor_ModalEditor
);

@Component({
  selector: "survey-editor",
  template: `
    <div id="surveyEditorContainer"></div>
  `
})
export class SurveyEditorComponent {
  public id;
  editor: SurveyEditor.SurveyEditor;
  @Input() json: any;
  @Output() surveySaved: EventEmitter<Object> = new EventEmitter();

  constructor(
    public surveyService: SurveyService,
    public activatedRoute: ActivatedRoute,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    // SurveyEditor.StylesManager.applyTheme("winter");
    this.id = this.activatedRoute.snapshot.params.id;
    this.surveyService.getSurvey(this.id).subscribe(
      (data: any) => {
        this.json = data.json;
        SurveyKo.JsonObject.metaData.addProperty(
          "questionbase",
          "popupdescription:text"
        );
        SurveyKo.JsonObject.metaData.addProperty(
          "page",
          "popupdescription:text"
        );
        SurveyKo.JsonObject.metaData.addProperty("question", {
          name: "score:number"
        });
        const editorOptions = {
          questionTypes: ["text", "comment", "checkbox", "radiogroup", "html"]
        };
        this.editor = new SurveyEditor.SurveyEditor(
          "surveyEditorContainer",
          editorOptions
        );
        this.editor.text = this.json;

        this.editor.saveSurveyFunc = this.saveMySurvey;
        // this.editor.isAutoSave = true;
        // this.editor.showState = true;
        this.editor.showOptions = true;
      },
      error => {
        this.messageService.showError(error);
        console.log("error", error);
      }
    );
  }

  saveMySurvey = () => {
    this.surveySaved.emit(JSON.parse(this.editor.text));
    this.surveyService.saveSurvey(this.id, this.editor.text).subscribe(
      data => {
        this.messageService.showSuccess("Survey saved");
      },
      error => {
        this.messageService.showError(error);
        console.log("error", error);
      }
    );
  };
}
