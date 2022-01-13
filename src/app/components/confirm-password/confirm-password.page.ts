import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.page.html',
  styleUrls: ['./confirm-password.page.scss'],
})
export class ConfirmPasswordPage implements OnInit {
  @ViewChild('inputPassword') inputPassword: IonInput;
  passwordControl: FormControl = new FormControl('', Validators.required);
  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.inputPassword.setFocus();
    }, 300);
  }
}
