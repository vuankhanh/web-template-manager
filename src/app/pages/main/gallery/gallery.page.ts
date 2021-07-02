import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  selection: string = 'product';
  constructor(

  ) { }

  ngOnInit() {
  }

  segmentChanged(event: CustomEvent){
    let target: HTMLIonSegmentElement = <HTMLIonSegmentElement>event.target;
    console.log(target.value);

  }

}
