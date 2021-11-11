import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hostConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private urlInsert: string = hostConfiguration.host+'/redirect/insert'
  constructor(
    private httpClient: HttpClient
  ) { }

  insert(token:string, originalUrl: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<RedirectInsertRespone>(this.urlInsert, { originalUrl },  { headers });
  }
}

export interface RedirectInsertRespone{
  shortenedLink: string,
  redirectTo: string
}
