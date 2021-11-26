import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
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
