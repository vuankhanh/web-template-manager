import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { ChoosePostsComponent } from '../choose-posts/choose-posts.component';

import { Support, SupportDetail } from 'src/app/Interfaces/Support';
import { Posts } from 'src/app/Interfaces/Posts';

import { SupportService } from 'src/app/services/api/support.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-support-modify',
  templateUrl: './support-modify.page.html',
  styleUrls: ['./support-modify.page.scss'],
})
export class SupportModifyPage implements OnInit, OnDestroy {
  @Input() support: Support;

  supportForm!: FormGroup;

  posts!: Posts;

  private subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private supportService: SupportService
  ) { }

  ngOnInit() {
    if(!this.support){
      this.initForm();
    }else{
      this.subscription.add(
        this.supportService.getDetail(this.support._id).subscribe(res=>{
          this.initForm(res);
          this.posts = res.postsId;
        })
      );
    }
  }

  initForm(support?: SupportDetail){
    this.supportForm = this.formBuilder.group({
      name: [support ? support.name : '', Validators.required],
      postsId: [support ? support.postsId._id : '', Validators.required]
    })
  }

  async choosePosts(){
    const modal = await this.modalController.create({
      component: ChoosePostsComponent
    });

    modal.present();
    const data = await modal.onDidDismiss();

    if(data.data){
      this.posts = <Posts>data.data;
      this.supportForm.controls['postsId'].setValue(this.posts._id);
    }
  }

  submitSupport(){
    if(this.support){
      this.update();
    }else{
      this.insert();
    }
  }

  insert(){
    this.subscription.add(
      this.supportService.insert(this.supportForm.value).subscribe(res=>{
        this.modalController.dismiss(res);
      })
    )
  }

  update(){
    this.subscription.add(
      this.supportService.update(this.support._id, this.supportForm.value).subscribe(res=>{
        this.modalController.dismiss(res);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
