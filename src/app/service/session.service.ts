import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  signOut(): void {
    sessionStorage.clear();
  }

   saveToken(token: string): void {
    // sessionStorage.removeItem('uname');
    sessionStorage.setItem('uname',token);
  }
   getToken(){
    return sessionStorage.getItem('uname');
  }
  isLoggenIn(){
    return this.getToken()!==null;
  }
}
