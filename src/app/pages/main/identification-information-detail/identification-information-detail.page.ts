import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-identification-information-detail',
  templateUrl: './identification-information-detail.page.html',
  styleUrls: ['./identification-information-detail.page.scss'],
})
export class IdentificationInformationDetailPage implements OnInit {
  routeParam: string;
  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.routeParam = this.activatedRoute.snapshot.params.param;
    console.log(this.routeParam);
  }

  ngOnInit() {
    
  }

}
