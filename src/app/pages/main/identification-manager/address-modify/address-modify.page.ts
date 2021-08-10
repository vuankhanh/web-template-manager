import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Address, District, Province, Ward } from 'src/app/Interfaces/Address';

import { AdministrativeUnitsService } from 'src/app/services/api/administrative-units.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { Identification } from 'src/app/Interfaces/Identification';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-address-modify',
  templateUrl: './address-modify.page.html',
  styleUrls: ['./address-modify.page.scss'],
})
export class AddressModifyPage implements OnInit {

  @Input() data: DataInit;
  @Input() identification: Identification;

  addressForm: FormGroup;

  provinces: Array<Province> = [];
  districts: Array<District> = [];
  wards: Array<Ward> = [];

  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private administrativeUnitsService: AdministrativeUnitsService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.formInit();
    this.getProvince();
    this.checkModalType(this.data);
  }

  formInit(){
    let phoneNumberRegEx = /((0)+([0-9]{9})\b)/g;
    this.addressForm = this.formBuilder.group({
      responsiblePerson: ['', Validators.required],
      phoneNumber: ['', { validators: [Validators.required, , Validators.pattern(phoneNumberRegEx)] }],
      street: ['', Validators.required],
      ward: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      position: this.formBuilder.group({
        lat: [''],
        lng: ['']
      }),
      isHeadquarters: [false, Validators.required],
    })
  }

  checkModalType(dataInit: DataInit){
    if(dataInit.type === 'insert'){
      
    }else if(dataInit.type === 'update' && dataInit.index >= 0){
      let address: Address = this.identification.address[dataInit.index];
      this.addressForm.controls['responsiblePerson'].setValue(address.responsiblePerson);
      this.addressForm.controls['phoneNumber'].setValue(address.phoneNumber);
      this.addressForm.controls['street'].setValue(address.street);
      this.addressForm.controls['isHeadquarters'].setValue(address.isHeadquarters);
      this.addressForm.get('position')?.get('lat')?.setValue(address.position?.lat);
      this.addressForm.get('position')?.get('lng')?.setValue(address.position?.lng);
      this.getDistrict(address.province.code);
      this.getWard(address.district.code);
    }
  }

  getProvince(){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenKey);
    if(tokenStoraged){
      this.subscription.add(
        this.administrativeUnitsService.getProvince(tokenStoraged.accessToken).subscribe(res=>{
          this.provinces = res;
          if(this.data.type === 'update' && this.data.index >= 0){
            let index:number = this.findIndexOfObjectInArray(this.identification.address[this.data.index].province._id, this.provinces)
            console.log(index);
            
            this.addressForm.controls['province'].setValue(index);
          }
          console.log(this.provinces);
        })
      )
    }
  }

  getDistrict(provinceCode: string, ){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenKey);
    if(tokenStoraged){
      this.subscription.add(
        this.administrativeUnitsService.getDistrict(tokenStoraged.accessToken, provinceCode).subscribe(res=>{
          this.districts = res;
          if(this.data.type === 'update' && this.data.index >= 0){
            let index:number = this.findIndexOfObjectInArray(this.identification.address[this.data.index].district._id, this.districts)
            this.addressForm.controls['district'].setValue(index);
          }
        }, error=>{
          this.districts = [];
        })
      )
    }
  }

  getWard(districtCode: string){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenKey);
    if(tokenStoraged){
      this.subscription.add(
        this.administrativeUnitsService.getWard(tokenStoraged.accessToken, districtCode).subscribe(res=>{
          this.wards = res;
          if(this.data.type === 'update' && this.data.index >= 0){
            let index:number = this.findIndexOfObjectInArray(this.identification.address[this.data.index].ward._id, this.wards)
            this.addressForm.controls['ward'].setValue(index);
          }
        }, error=>{
          this.wards = [];
        })
      )
    }
  }

  provinceChange(){
    let valueProvince: number = parseInt(this.addressForm.value.province);
    let province: Province = this.provinces[valueProvince];
    this.getDistrict(province.code);
  }

  districtChange(){
    let valueDistrict: number = parseInt(this.addressForm.value.district);
    let district: District = this.districts[valueDistrict];
    this.getWard(district.code);
  }

  modifyAddress(){
    if(this.data.type === 'insert'){
      this.insert();
    }else if(this.data.type === 'update'){
      this.update();
    }else{
      this.toastService.shortToastError('Đã có lỗi xảy ra', 'Lỗi ')
    }
  }

  update(){
    if(this.addressForm.valid){
      console.log(this.addressForm.value);

      let address: Address = {
        responsiblePerson: this.addressForm.value.responsiblePerson,
        phoneNumber: this.addressForm.value.phoneNumber,
        street: this.addressForm.value.street,
        province: this.provinces[this.addressForm.value.province],
        district: this.districts[this.addressForm.value.district],
        ward: this.wards[this.addressForm.value.ward],
        position: this.addressForm.value.position,
        isHeadquarters: this.addressForm.value.isHeadquarters,
      }
      
      this.identification.address[this.data.index] = address;

      if(address.isHeadquarters){
        for(let i=0; i< this.identification.address.length; i++){
          if(i != this.data.index) this.identification.address[i].isHeadquarters = false;
        }
      }
      this.modalController.dismiss(this.identification);
    }
  }

  async insert(){
    if(this.addressForm.valid){
      console.log(this.addressForm.value);

      let address: Address = {
        street: this.addressForm.value.street,
        responsiblePerson: this.addressForm.value.responsiblePerson,
        phoneNumber: this.addressForm.value.phoneNumber,
        province: this.provinces[this.addressForm.value.province],
        district: this.districts[this.addressForm.value.district],
        ward: this.wards[this.addressForm.value.ward],
        position: this.addressForm.value.position,
        isHeadquarters: this.addressForm.value.isHeadquarters,
      };
      
      this.identification.address.push(address);

      if(address.isHeadquarters){
        for(let i=0; i< this.identification.address.length; i++){
          if(i != this.identification.address.length-1) this.identification.address[i].isHeadquarters = false;
        }
      }

      this.modalController.dismiss(this.identification);
      
    }
  }

  findIndexOfObjectInArray(
    id: string,
    array: Array<Province> | Array<District> | Array<Ward>
  ){
    return array.findIndex(object=>object._id === id);
  }

}

interface DataInit{
  type: 'insert' | 'update',
  index: number
}
