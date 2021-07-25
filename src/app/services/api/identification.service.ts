import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hostConfiguration } from 'src/environments/environment';

import { BannerGallery } from 'src/app/Interfaces/BannerGallery';
import { Identification, SocialNetwork } from 'src/app/Interfaces/Identification';
import { Address } from 'src/app/Interfaces/Address';
import { WillUpload } from 'src/app/Interfaces/WillUpload';

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {
  private urlIdentification: string = hostConfiguration.host+'/identification';
  private urlIdentificationUpdateLogo: string = hostConfiguration.host+'/identification/logo/update';
  private urlIdentificationUpdatePhoneNumber: string = hostConfiguration.host+'/identification/phone-number/update';
  private urlIdentificationUpdateSocialnetwork: string = hostConfiguration.host+'/identification/social-networking/update';
  private urlIdentificationUpdateAddress: string = hostConfiguration.host+'/identification/address/update';
  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(token: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get<Identification>(this.urlIdentification, { headers: headers })
  }

  updateLogo(token: string, willUpload: WillUpload){
    let headers: HttpHeaders = new HttpHeaders({
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    params = params.append('name', 'Logo Carota');

    let formData = new FormData();
    formData.append('single-file', willUpload);

    return this.httpClient.put<Identification>(this.urlIdentificationUpdateLogo, formData, { headers, params });
  }

  updatePhoneNumber(token: string, phoneNumber: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.put<Identification>(this.urlIdentificationUpdatePhoneNumber, { phoneNumber }, { headers });
  }

  updateSocialNetwork(token: string, socialNetwork: SocialNetwork){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.put<Identification>(this.urlIdentificationUpdateSocialnetwork, { socialNetwork }, { headers });
  }

  updateAddress(token: string, addresses: Array<Address>){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.put<Identification>(this.urlIdentificationUpdateAddress, { addresses }, { headers });
  }
}
