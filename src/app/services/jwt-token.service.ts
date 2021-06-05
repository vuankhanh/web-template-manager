import { Injectable } from '@angular/core';

import jwtDecode, { JwtPayload } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  getTokenInformation(token: string){
    return jwtDecode<JwtPayload>(token);
  }
}
