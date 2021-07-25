import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Identification } from 'src/app/Interfaces/Identification';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, OnDestroy {
  @Input() data: Identification;
  @Output() emitChange: EventEmitter<Identification> = new EventEmitter<Identification>();
  myForm: FormGroup;

  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.initForm();
  }

  get addresses() {
    return <FormArray>this.myForm.controls["addresses"];
  }

  initForm(){
    let formArray: FormArray = new FormArray([]);

    for(let i = 0; i< this.data.address.length; i++){
      let phoneNumber = this.data.address[i];
      formArray.push(this.formBuilder.group({
        responsiblePerson: [phoneNumber.responsiblePerson, { validators: [Validators.required] }],
        phoneNumber: [phoneNumber.phoneNumber, { validators: [Validators.required] }],
        street: [phoneNumber.street, { validators: [Validators.required] }],
        ward: [phoneNumber.ward, { validators: [Validators.required] }],
        district: [phoneNumber.district, { validators: [Validators.required] }],
        province: [phoneNumber.province, { validators: [Validators.required] }],
        isHeadquarters: [phoneNumber.isHeadquarters],
        position: [this.formBuilder.group({
          lat: phoneNumber.position.lat,
          lng: phoneNumber.position.lng,
        }), { validators: [Validators.required] }],
      }));
    }
    
    this.myForm = this.formBuilder.group({
      addresses: formArray
    });

    console.log(this.addresses);
  }

  addAddress(){
    this.addresses.push(this.formBuilder.group({
      responsiblePerson: ['', { validators: [Validators.required] }],
      phoneNumber: ['', { validators: [Validators.required] }],
      street: ['', { validators: [Validators.required] }],
      ward: ['', { validators: [Validators.required] }],
      district: ['', { validators: [Validators.required] }],
      province: ['', { validators: [Validators.required] }],
      isHeadquarters: [false],
      position: [this.formBuilder.group({
        lat: '',
        lng: '',
      }), { validators: [Validators.required] }],
    }))
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
