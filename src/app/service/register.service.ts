import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private data:any = [];//array bcz can register multiple users 

  setData(data:any){
this.data.push(data);
      console.log(this.data);
  }

  getData():any{
      return this.data;
  }
  constructor() { }
}
