import { Component, OnInit } from '@angular/core';

import { showIdentificationInfor, ShowIdentificationIformation } from '../../../mock-data/identification-information';
@Component({
  selector: 'app-identification-information',
  templateUrl: './identification-information.page.html',
  styleUrls: ['./identification-information.page.scss'],
})
export class IdentificationInformationPage implements OnInit {
  identificationInfor: ShowIdentificationIformation;
  editIcon: string = 'pencil';
  constructor(
  ) { }

  ngOnInit() {
    this.identificationInfor = showIdentificationInfor;
    console.log(this.identificationInfor);
    
  }

  changePhoneNumber(param: string){
    if(!param) return;
    switch(param){
      case 'logo': {
        break;
      }
      case 'phoneNumber': {
        break;
      }
      case 'socialNetworking': {
        break;
      }
      case 'address': {
        break;
      }
    }
  }

}
