import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { Editor, Toolbar, toHTML } from "ngx-editor";

import { Posts } from 'src/app/Interfaces/Posts';

import { LocalStorageService } from 'src/app/services/local-storage.service';

const draftPostsNew = 'draft-posts-new';
@Component({
  selector: 'app-post-modify',
  templateUrl: './post-modify.page.html',
  styleUrls: ['./post-modify.page.scss'],
})
export class PostModifyPage implements OnInit {
  @Input() type: 'update' | 'insert';
  @Input() data: Posts;

  params: Params;
  editPostsName: boolean = false;
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
  postsForm: FormGroup;
  preview: string = '';
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    this.editor = new Editor();
  }

  ngOnInit() {
    console.log(this.data);
    if(this.type){
      this.params = {
        type: <'update' | 'insert'>this.type,
        data: <Posts>this.data
      }
      
      if(this.type === 'update'){
        this.initForm(this.params.data);
      }else{
        let draftProductNewStoraged = this.localStorageService.get(draftPostsNew);
        if(draftProductNewStoraged){
          this.initForm(draftProductNewStoraged);
        }else{
          this.initForm(this.params.data);
        }
      }
    }
  }

  initForm(posts: Posts){
    this.postsForm = this.formBuilder.group({
      type: [ posts?.type ? posts?.type : '', Validators.required],
      name: [ posts?.name ? posts?.name : '', Validators.required],
      editorContent: [posts?.data ? JSON.parse(posts?.data) : '', Validators.required],
    })
  }

  submitPost(){
    if(this.postsForm.valid){
      
    }
    this.preview = toHTML(this.postsForm.value.editorContent);
  }

  ngOnDestroy(){
    this.editor.destroy();
  }

}

interface Params{
  type: 'insert' | 'update',
  data: Posts
}