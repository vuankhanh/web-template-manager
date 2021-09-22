import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(
    private platform: Platform
  ) {}

  isDesktop(): boolean{
    return this.platform.is('desktop')
  }
}
