import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Identification } from 'src/app/Interfaces/Identification';

@Component({
  selector: 'app-identification-information-modify',
  templateUrl: './identification-information-modify.page.html',
  styleUrls: ['./identification-information-modify.page.scss'],
})
export class IdentificationInformationModifyPage implements OnInit {
  routeParam: string;
  @Input() type: 'logo' | 'phoneNumber' | 'socialNetworking' | 'address';
  @Input() identification: Identification;
  constructor(
    public modalController: ModalController
  ) {}

  ngOnInit() {
    
  }

  identificationChange(event: Identification){
    this.modalController.dismiss(event);
  }

}
