import { Injectable } from '@angular/core';
import{ Storage} from '@ionic/storage'


@Injectable({
  providedIn: 'root'
})
export class StorageService {
private user: {number: string, ext: string}

  constructor(private storage: Storage) { }


  saveUser = (user)=>{
    this.user = user
    this.storage.set('user', this.user)
  }
  getUser = ()=>{
    return this.storage.get('user')
    .then((resp)=>{
      this.user = resp !=null? resp: null;
      return this.user;
    })
  }
  // is user in system
  isRegisted = (): boolean=>{
  if(this.user) return true;
  return false

  }
}
