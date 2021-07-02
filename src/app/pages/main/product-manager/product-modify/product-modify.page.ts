import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { ChooseGalleryPage } from '../choose-gallery/choose-gallery.page';

import { ProductCategory } from '../../../../Interfaces/ProductCategory';

import { ProductCategoryService } from 'src/app/services/api/product-category.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Product } from '../../../../Interfaces/Product';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { Subscription } from 'rxjs';

const tokenKey = "authentication-information";
const draftProductNew = "draft-product-new";
@Component({
  selector: 'app-product-modify',
  templateUrl: './product-modify.page.html',
  styleUrls: ['./product-modify.page.scss'],
})
export class ProductModifyPage implements OnInit, OnDestroy {
  @Input() type: 'update' | 'insert';
  @Input() data: Product;
  productForm: FormGroup;
  params: Params;

  productCategorys: Array<ProductCategory>;

  currencyUnits: Array<string> = ['VND', '$', '€'];
  units: Array<string> = ['kg', 'gam', 'túi'];

  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private localStorageService: LocalStorageService,
    private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit() {
    this.getProductCategory();
    if(this.type){
      this.params = {
        type: <'update' | 'insert'>this.type,
        data: <Product>this.data
      }
      let draftProductNewStoraged = this.localStorageService.get(draftProductNew);
      if(draftProductNewStoraged){
        this.initForm(draftProductNewStoraged);
      }else{
        this.initForm(this.params.data);
      }

    }
  }

  getProductCategory(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);

    if(tokenStoraged && tokenStoraged.accessToken){
      let accessToken = tokenStoraged.accessToken;
      this.subscription.add(
        this.productCategoryService.get(accessToken).subscribe(res=>{
          this.productCategorys = res;
          console.log(this.productCategorys);
        })
      )
    }
  }

  initForm(data: Product){
    this.productForm = this.formBuilder.group({
      name: [data && data!.name ? data!.name : '', Validators.required],
      category: [data && data!.category ? data!.category : null, Validators.required],

      price: [data && data!.price ? data!.price : 0, Validators.required],
      currencyUnit: [data && data!.currencyUnit ? data!.currencyUnit : this.currencyUnits[0], Validators.required],
      theRemainingAmount: [data && data!.theRemainingAmount ? data!.theRemainingAmount : 0, Validators.required],
      unit: [data && data!.unit ? data!.unit : this.units[0], Validators.required],

      sortDescription: [data && data!.sortDescription ? data!.sortDescription : '', Validators.required],

      longDescription: [data && data!.longDescription ? data!.longDescription : '', Validators.required],
      supplier: [data && data!.supplier ? data!.supplier : null],
      albumImg: [data && data!.albumImg ? data!.albumImg : null, Validators.required],
      albumVideo: [data && data!.albumVideo ? data!.albumVideo : null],
      thumbnailUrl: [data && data!.thumbnailUrl ? data!.thumbnailUrl : '', Validators.required],

      highlight: [data && data!.highlight ? data!.highlight : false, Validators.required],
      imgBannerUrl: [data && data!.imgBannerUrl ? data!.imgBannerUrl : ''],
    })
  }

  async chooseGallery(){
    const modal = await this.modalController.create({
      component: ChooseGalleryPage,
      componentProps: {
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data){
      let productGallery: ProductCategory = <ProductCategory>data.data;
      this.productForm.controls['albumImg'].setValue(productGallery);
    }
  }

  addBanner(event: Event){
    let target: HTMLInputElement = <HTMLInputElement>event.target;
    console.log(target.files);

    let albumImgValue = this.productForm.controls['imgBannerUrl'].value;
    console.log(albumImgValue);
  }

  modify(){
    console.log(this.productForm.value);
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    console.log(this.productForm.value);
    this.localStorageService.set(draftProductNew, this.productForm.value);
  }

}

interface Params{
  type: 'insert' | 'update',
  data: Product
}
