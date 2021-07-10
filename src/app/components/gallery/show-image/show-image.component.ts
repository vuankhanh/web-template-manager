import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Media } from 'src/app/Interfaces/ProductGallery';

import { WillUpload } from '../../../Interfaces/WillUpload'

import { GalleryRoutePipe } from '../../../pipes/gallery-route/gallery-route.pipe';

import { ClipboardService } from 'ngx-clipboard'
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss'],
})
export class ShowImageComponent implements OnInit, OnChanges {
  @Input() images: Array<Media>;
  @Input() willUpload: Array<WillUpload>;
  @Input() isMain: number;
  @Output() emitChangeMain = new EventEmitter<number>();
  @Output() emitRemoveImage = new EventEmitter<Media>();
  @Output() emitRemoveWillUpload = new EventEmitter<number>();

  imagesLength: number = 0;
  constructor(
    private galleryRoutePipe: GalleryRoutePipe,
    private clipboardService: ClipboardService,
    private toastService: ToastService
  ) { }

  ngOnInit() {}

  ngOnChanges(changes){
    if(changes.images){
      this.imagesLength = changes.images.currentValue.length;
    }
  }

  setMain(index: number){
    this.emitChangeMain.emit(index);
  }

  setMainWillUpload(index: number){
    let i = (index + this.imagesLength);
    this.emitChangeMain.emit(i);
  }

  removeImage(image: Media){
    this.emitRemoveImage.emit(image);
  }

  removeWillUpload(willUpload: WillUpload, index: number){
    this.emitRemoveWillUpload.emit(index);
  }

  clipboard(src: string){
    try {
      let fullSrc: string = this.galleryRoutePipe.transform(src);
      this.clipboardService.copy(fullSrc);
      this.toastService.shortToastSuccess('Đã copy "'+ fullSrc + '"', '');
    } catch (error) {
      this.toastService.shortToastWarning('Đã có lỗi xảy ra '+error, 'Chưa copy');
    }
  }
}
