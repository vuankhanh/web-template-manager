import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

import { Identification } from 'src/app/Interfaces/Identification';
import { IdentificationService } from 'src/app/services/api/identification.service';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss'],
})
export class PhoneNumberComponent implements OnInit, OnDestroy {
  @ViewChildren('inputPhoneNumber') inputPhoneNumber: QueryList<IonInput>;

  @Input() data: Identification;
  @Output() emitChange: EventEmitter<Identification> = new EventEmitter<Identification>();
  myForm: FormGroup;

  isMain: number;
  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private identificationService: IdentificationService
  ) {
    
  }

  ngOnInit() {
    console.log(this.data);
    this.initForm();
  }

  get phoneNuber() {
    return <FormArray>this.myForm.controls["phoneNumber"];
  }

  initForm(){
    let formArray: FormArray = new FormArray([]);

    for(let i = 0; i< this.data.phoneNumber.length; i++){
      let phoneNumber = this.data.phoneNumber[i];
      formArray.push(this.formBuilder.group({
        number: [phoneNumber.number, { validators: [Validators.required] }],
        isMain: [phoneNumber.isMain]
      }));
      if(phoneNumber.isMain) this.isMain = i;
    }
    
    this.myForm = this.formBuilder.group({
      phoneNumber: formArray
    });
    
  }

  radioGroupChange(){
    for(let i = 0; i<this.phoneNuber.controls.length; i++){
      let number: FormGroup = <FormGroup>this.phoneNuber.controls[i];
      number.controls['isMain'].setValue(this.isMain === i ? true : false);
    }
  }

  removePhoneNumber(index: number){
    this.phoneNuber.removeAt(index);
    if(this.isMain === index){
      this.isMain--;
    }
    console.log(this.phoneNuber);
  }

  addPhoneNumber(){
    this.phoneNuber.push(this.formBuilder.group({
      number: ['', { validators: [Validators.required] }],
      isMain: [false]
    }));

    setTimeout(() => {
      this.inputPhoneNumber.last.setFocus();
    }, 150);
  }

  updatePhoneNumber(){
    if(this.myForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        this.subscription.add(
          this.identificationService.updatePhoneNumber(tokenStoraged.accessToken, this.myForm.value.phoneNumber).subscribe(res=>{
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
