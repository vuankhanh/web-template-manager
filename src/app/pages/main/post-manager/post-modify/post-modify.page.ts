import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonContent, ModalController } from '@ionic/angular';
import { Editor, Toolbar, toHTML, toDoc } from "ngx-editor";

import { Posts } from 'src/app/Interfaces/Posts';

import { GalleryPage } from '../../gallery/main/gallery.page';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PostsService } from 'src/app/services/api/posts.service';
import { ResponseLogin } from 'src/app/services/api/login.service';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-post-modify',
  templateUrl: './post-modify.page.html',
  styleUrls: ['./post-modify.page.scss'],
})
export class PostModifyPage implements OnInit {
  @ViewChild(IonContent) ionContent: IonContent;

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

  currentPositionScroll: number = 0;
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private postsService: PostsService,
  ) {
    this.editor = new Editor();
  }

  ngOnInit() {
    if(this.type){
      this.params = {
        type: <'update' | 'insert'>this.type,
        data: <Posts>this.data
      }
      
      if(this.type === 'update'){
        let posts: Posts = JSON.parse(JSON.stringify(this.params.data));
        posts.data = JSON.parse(posts.data);
        this.initForm(posts);
      }else{
        this.initForm();
      }
    }
  }

  async openGallery(){
    const modal = await this.modalController.create({
      component: GalleryPage,
      componentProps: {
        componentType: 'modal',
      },
      cssClass: 'gallery-modal'
    });

    return modal.present()
  }

  logScrolling(event){
    this.currentPositionScroll = event.detail.scrollTop;
  }

  initForm(posts?: Posts){
    this.postsForm = this.formBuilder.group({
      type: [ posts?.type ? posts?.type : '', Validators.required],
      name: [ posts?.name ? posts?.name : '', Validators.required],
      data: [ posts?.data ? posts?.data : '', Validators.required],
    });
    this.postsForm.valueChanges.subscribe(change=>console.log(change)
    )
  }

  moveToTop(){
    this.ionContent.scrollToTop(200);
  }

  submitPost(){
    
    if(this.params.type === 'insert'){
      this.insert();
    }else if(this.params.type === 'update'){
      this.update();
    }
  }

  insert(){
    if(this.postsForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let posts: Posts = this.postsForm.value;
        posts.data = toDoc(posts.data);
        this.postsService.insert(tokenStoraged.accessToken, this.postsForm.value).subscribe(res=>{
          console.log(res);
        },err=>console.log(err));
      }
    }
  }

  update(){
    if(this.postsForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let posts: Posts = {
          _id: this.params.data._id,
          ...this.postsForm.value
        };

        this.postsService.update(tokenStoraged.accessToken, posts).subscribe(res=>{
          console.log(res);
          
        },err=>console.log(err));
      }
    }
  }

  ngOnDestroy(){
    console.log(toDoc(this.postsForm.value.data));
    this.editor.destroy();
  }

}

interface Params{
  type: 'insert' | 'update',
  data: Posts
}