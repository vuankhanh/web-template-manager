import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';


import { ChooseBannerGalleryPage } from '../choose-banner-gallery/choose-banner-gallery.page';
import { ChoosePostsPage } from '../choose-posts/choose-posts.page';
import { ChooseGalleryPage } from '../choose-gallery/choose-gallery.page';
import { ChooseGalleryVideoPage } from '../choose-gallery-video/choose-gallery-video.page';

import { ProductCategory } from '../../../../Interfaces/ProductCategory';
import { Product } from '../../../../Interfaces/Product';
import { BannerGallery } from 'src/app/Interfaces/BannerGallery';
import { Posts } from 'src/app/Interfaces/Posts';
import { ProductGalleryVideo } from 'src/app/Interfaces/ProductGalleryVideo';
import { ProductGallery } from 'src/app/Interfaces/ProductGallery';

import { ProductCategoryService } from 'src/app/services/api/product-category.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { ProductService } from 'src/app/services/api/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { productHightLight } from 'src/app/services/formCustom/validators'; 

import { Subscription } from 'rxjs';

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
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getProductCategory();
    if(this.type){
      this.params = {
        type: <'update' | 'insert'>this.type,
        data: <Product>this.data
      }
      console.log(this.params.data);
      
      if(this.type === 'update'){
        this.initForm(this.params.data);
      }else{
        let draftProductNewStoraged = this.localStorageService.get(draftProductNew);
        if(draftProductNewStoraged){
          this.initForm(draftProductNewStoraged);
        }else{
          this.initForm(this.params.data);
        }
      }
    }
  }

  getProductCategory(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);

    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productCategoryService.get(tokenStoraged.accessToken).subscribe(res=>{
          this.productCategorys = res;
          console.log()
          if(this.type === 'update'){
            let index = this.productCategorys.findIndex(productCategory=>this.params.data.category._id && (productCategory._id === this.params.data.category._id));
            console.log(index);
            if(index>=0){
              this.productForm.controls['category'].setValue(this.productCategorys[index]);
            }
          }else{
            let draftProductNewStoraged = this.localStorageService.get(draftProductNew);
            if(draftProductNewStoraged && draftProductNewStoraged.category){
              let categoryDefault: ProductCategory = draftProductNewStoraged.category;
              let index = this.productCategorys.findIndex(productCategory=>categoryDefault._id && (productCategory._id === categoryDefault._id));
              if(index>=0){
                this.productForm.controls['category'].setValue(this.productCategorys[index]);
              }
            }
          }
        })
      )
    }
  }

  initForm(data: Product){
    console.log(data)
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

      highlight: [data && data!.highlight ? data!.highlight : false, Validators.required],
      albumBanner: [data && data!.albumBanner ? data!.albumBanner : null],
    }, {validator: productHightLight()});
  }

  async choosePosts(){
    const modal = await this.modalController.create({
      component: ChoosePostsPage
    });

    modal.present();

    const data = await modal.onDidDismiss();

    if(data.data){
      let posts: Posts = <Posts>data.data;
      console.log(posts);
      
      this.productForm.controls['longDescription'].setValue(posts);
    }
  }

  async chooseGallery(){
    const modal = await this.modalController.create({
      component: ChooseGalleryPage,
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data){
      let productGallery: ProductGallery = <ProductGallery>data.data;
      this.productForm.controls['albumImg'].setValue(productGallery);
    }
  }

  async chooseGalleryVideo(){
    const modal = await this.modalController.create({
      component: ChooseGalleryVideoPage,
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data){
      let productGalleryVideo: ProductGalleryVideo = <ProductGalleryVideo>data.data;
      console.log(productGalleryVideo)
      this.productForm.controls['albumVideo'].setValue(productGalleryVideo);
    }
  }

  async chooseBannerGallery(){
    const modal = await this.modalController.create({
      component: ChooseBannerGalleryPage
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    
    if(data.data){
      let bannerGallery: BannerGallery = <BannerGallery>data.data;
      this.productForm.controls['albumBanner'].setValue(bannerGallery);
      console.log(data);
    }
  }

  modify(){
    if(this.params.type === 'insert'){
      this.insert();
    }else if(this.params.type === 'update'){
      this.update();
    }
  }

  update(){
    if(this.productForm.valid){
      let product: Product = {
        _id: this.params.data._id,
        ...this.productForm.value
      }
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productService.update(accessToken, product).subscribe(res=>{
          if(res){
            this.toastService.shortToastSuccess('Đã cập nhật Sản phẩm sản phẩm', 'Thành công').then(_=>{
              this.params = {
                type: <'update' | 'insert'>this.type,
                data: res
              }
              this.modalController.dismiss(this.params);
            });
          }else{
            this.toastService.shortToastWarning('Sản phẩm đã bị xóa', '');
          }
        },error=>{
          console.log(error);
          if(error.status === 409){
            this.toastService.shortToastError('Sản phẩm này đã tồn tại', 'Thất bại');
          }else{
            this.toastService.shortToastError('Đã có lỗi xảy ra', 'Thất bại');
          }
        })
      }else{
        this.toastService.shortToastWarning('Phiên đăng nhập của bạn đã hết hạn', 'Đăng nhập lại');
      }
    }
  }

  insert(){
    if(this.productForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productService.insert(accessToken, this.productForm.value).subscribe(res=>{
          console.log(res);
          this.toastService.shortToastSuccess('Đã thêm một sản phẩm', 'Thành công').then(_=>{
            this.params = {
              type: <'update' | 'insert'>this.type,
              data: res
            }
            this.modalController.dismiss(this.params);
          });
        },error=>{
          console.log(error);
          if(error.status === 409){
            this.toastService.shortToastError('Sản phẩm này đã tồn tại', 'Thất bại');
          }else{
            this.toastService.shortToastError('Đã có lỗi xảy ra', 'Thất bại');
          }
        })
      }else{
        this.toastService.shortToastWarning('Phiên đăng nhập của bạn đã hết hạn', 'Đăng nhập lại');
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    console.log(this.productForm.value);
    if(this.type === 'insert'){
      this.localStorageService.set(draftProductNew, this.productForm.value);
    }
  }

}

interface Params{
  type: 'insert' | 'update',
  data: Product
}
