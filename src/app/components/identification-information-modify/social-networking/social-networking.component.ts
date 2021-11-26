import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Identification } from 'src/app/Interfaces/Identification';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { IdentificationService } from 'src/app/services/api/identification.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-social-networking',
  templateUrl: './social-networking.component.html',
  styleUrls: ['./social-networking.component.scss'],
})
export class SocialNetworkingComponent implements OnInit, OnDestroy {
  @Input() data: Identification;
  @Output() emitChange: EventEmitter<Identification> = new EventEmitter<Identification>();
  socialNetworks: Array<string> = ['facebook', 'zalo', 'google', 'instagram', 'twitter'];
  myForm: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private identificationService: IdentificationService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.initForm();
  }

  get socialNetwork() {
    return <FormArray>this.myForm.controls["socialNetwork"];
  }

  initForm(){
    let formArray: FormArray = new FormArray([]);

    for(let i = 0; i< this.data.social.length; i++){
      let socialNetwork = this.data.social[i];
      formArray.push(this.formBuilder.group({
        name: [socialNetwork.name, { validators: [Validators.required] }],
        url: [socialNetwork.url, { validators: [Validators.required] }]
      }));
    }
    
    this.myForm = this.formBuilder.group({
      socialNetwork: formArray
    });
  }

  removeSocialNetwork(index: number){
    this.socialNetwork.removeAt(index);
    console.log(index);
    
  }

  addSocialNetwork(){
    this.socialNetwork.push(this.formBuilder.group({
      name: ['', { validators: [Validators.required] }],
      url: ['', { validators: [Validators.required] }]
    }));
  }

  updateSocialNetwork(){
    if(this.myForm.valid){
      console.log(this.myForm.value);
      
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        this.subscription.add(
          this.identificationService.updateSocialNetwork(tokenStoraged.accessToken, this.myForm.value.socialNetwork).subscribe(res=>{
            this.emitChange.emit(res);
          })
        )
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
