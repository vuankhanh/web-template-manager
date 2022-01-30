import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Unit } from 'src/app/Interfaces/Product';

@Component({
  selector: 'app-product-modify-unit',
  templateUrl: './product-modify-unit.page.html',
  styleUrls: ['./product-modify-unit.page.scss'],
})
export class ProductModifyUnitPage implements OnInit {
  packagingTypes: Array<string> = ['Túi', 'Hộp'];
  unitOfMassMeasurements: Array<string> = ['kg', 'gr'];

  @Input() unit: Unit;

  unitForm: FormGroup;
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm(this.unit);
  }

  initForm(unit: Unit){
    this.unitForm = this.formBuilder.group({
      packagingType: [unit ? unit.packagingType : '', Validators.required],
      weightNumber: [unit ? unit.weightNumber : '', Validators.required],
      unitOfMassMeasurement: [unit ? unit.unitOfMassMeasurement : '', Validators.required],
    })
  }

  close(){
    if(this.unitForm.valid){
      this.modalController.dismiss(this.unitForm.value);
    }
  }
}
