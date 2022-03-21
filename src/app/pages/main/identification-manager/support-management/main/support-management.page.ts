import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SupportModifyPage } from '../support-modify/support-modify.page';

import { SupportService } from 'src/app/services/api/support.service';

import { Subscription } from 'rxjs';
import { Support } from 'src/app/Interfaces/Support';

@Component({
  selector: 'app-support-management',
  templateUrl: './support-management.page.html',
  styleUrls: ['./support-management.page.scss'],
})
export class SupportManagementPage implements OnInit {
  supports: Array<Support> = [];
  subscription: Subscription = new Subscription();
  constructor(
    private modalController: ModalController,
    private supportService: SupportService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.subscription.add(
      this.supportService.getAll().subscribe(res=>{
        console.log(res);
        this.supports = res;
      })
    )
  }

  async navigatorToModify(support?: Support){
    console.log(support);
    const modal = await this.modalController.create({
      component: SupportModifyPage,
      componentProps: {
        support
      },
      cssClass: 'support-modify-modal'
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    console.log(data);
    if(data.data){
      if(support){
        this.supports.push(data.data.data);
      }else{
        for(let [index, support] of this.supports.entries()){
          if(support._id === data.data.data._id){
            this.supports[index] = data.data.data;
          }
        }
      }
    }
  }

}
