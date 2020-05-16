import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageService } from 'src/app/SERVICES/storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {} from 'google-maps';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
location: string[];
map: any;
marker: any;
service: any;
infowindow: any;
places: any [];

@ViewChild('map',{static: false}) mapElement: ElementRef

  constructor( private storageService: StorageService, private geoLocation: Geolocation ) { }

  user:{} ={}

  ngOnInit() {
    
  }
  ionViewWillEnter(){
 // this.initializeMap();
  this.getUser()
 this.getLocation()
  }
  initializeMap(lat, lng){

   let userLocation  = new google.maps.LatLng(lat, lng);
   this.infowindow = new google.maps.InfoWindow();
   this.map = new google.maps.Map(
    this.mapElement.nativeElement,
    {center: userLocation, zoom: 15}
  );
  this.marker = new google.maps.Marker({
    position: userLocation,
    map: this.map,
    title: 'You'

  })
 this.service = new google.maps.places.PlacesService(this.map)


  }
  getUser(){
    this.storageService.getUser().then((resp)=> {this.user = resp; console.log('user ', this.user)})
  }
  getLocation(){
    this.geoLocation.getCurrentPosition().then((resp)=>{
    let lat = resp.coords.latitude;
    let lng = resp.coords.longitude
    this.initializeMap(lat, lng)

    }).catch((error)=>{
      // launch turn on internet connection pop up or user denied geolocation
      console.log("error getting location", error)
    })

  }

  search(p){
    console.log('getting ', p);
    let request ={
      query: p,
      fields: ['name', 'geometry']
    }

    this.service.findPlaceFromQuery(request, (results, status)=>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.places = results;
        //console.log(this.places[0].name)
      }else{
        console.log('error getting request')
      }
    })

  }
  selectPlace(p){
    console.log('me and me ', p)
  }
  

}
