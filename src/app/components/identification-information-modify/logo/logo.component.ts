import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Identification } from 'src/app/Interfaces/Identification';

import { IdentificationService } from 'src/app/services/api/identification.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit, OnDestroy {
  @Input() data: Identification;
  @Output() emitChange: EventEmitter<Identification> = new EventEmitter<Identification>();

  willUploadLogo: FormControl = new FormControl();
  subscription: Subscription = new Subscription();
  constructor(
   private identificationService: IdentificationService,
   private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {}

  async onFileSelect(event: Event){
    let target: HTMLInputElement = <HTMLInputElement>event.target;
    let files = target.files;

    if (files.length > 0) {
      this.willUploadLogo.setValue(files[0]);
        this.willUploadLogo.value.base64 = await this.previewImage(files[0]);
    }
  }

  previewImage(file: File){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  updateLogo(){
    if(this.willUploadLogo.value){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        this.subscription.add(
          this.identificationService.updateLogo(tokenStoraged.accessToken, this.willUploadLogo.value).subscribe(res=>{
            this.emitChange.emit(res);
            this.willUploadLogo.reset();
          })
        )
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
