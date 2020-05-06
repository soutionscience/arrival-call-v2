import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/SERVICES/storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  location: string[];

  constructor( private storageService: StorageService, private geoLocation: Geolocation ) { }
  user:{} ={}

  ngOnInit() {
    this.getUser()
     this.getLocation()
  }
  getUser(){
    this.storageService.getUser().then((resp)=> {this.user = resp; console.log('user ', this.user)})
  }
  getLocation(){
    this.geoLocation.getCurrentPosition().then((resp)=>{
     console.log('locations is' ,resp)

    }).catch((error)=>{
      console.log("error getting location", error)
    })

  }
  

}
