import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BannerGallery } from 'src/app/Interfaces/BannerGallery';

@Component({
  selector: 'app-banner-gallery-modify',
  templateUrl: './banner-gallery-modify.page.html',
  styleUrls: ['./banner-gallery-modify.page.scss'],
})
export class BannerGalleryModifyPage implements OnInit {
  @Input() type:string;
  @Input() data: BannerGallery;

  bannerGalleryForm: FormGroup;
  params: Params;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

}

interface Params{
  type: 'insert' | 'update',
  data: BannerGallery
}
