import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

import { Validators, Editor, Toolbar, toHTML } from "ngx-editor";

import jsonDoc from "./doc";

@Component({
  selector: 'app-post-manager-about-us',
  templateUrl: './post-manager-about-us.page.html',
  styleUrls: ['./post-manager-about-us.page.scss'],
})
export class PostManagerAboutUsPage implements OnInit, OnDestroy {
  editordoc = jsonDoc;
  editor: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];
  form: FormGroup = new FormGroup({
    editorContent: new FormControl(
      { value: jsonDoc, disabled: false },
      Validators.required()
    )
  });
  preview: string = '';
  constructor() {
    this.editor = new Editor();
  }

  ngOnInit() {
  }

  get doc():AbstractControl | null {
    return this.form.get("editorContent");
  }

  submitPost(){
    console.log(toHTML(this.doc?.value));
    this.preview = toHTML(this.doc?.value)
  }

  ngOnDestroy(){
    this.editor.destroy();
  }

}
