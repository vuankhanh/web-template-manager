import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gallery-video',
  templateUrl: './gallery-video.page.html',
  styleUrls: ['./gallery-video.page.scss'],
})
export class GalleryVideoPage implements OnInit {
  @Input() componentType: 'modal';
  selection: string = 'product';
  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
    if(this.componentType === 'modal'){
      console.log('Đây là modal')
    }
  }

  segmentChanged(){
    console.log(this.selection);
  }

}
