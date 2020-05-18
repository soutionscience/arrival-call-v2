import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { StorageService } from 'src/app/SERVICES/storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {} from 'google-maps';
import { ActionSheetController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
location: string[];
map: any;
markers: any [] =[];
service: any;
infowindow: any;
places: any [];
//auto complete stuff



@ViewChild('map',{static: false}) mapElement: ElementRef

  constructor( private storageService: StorageService, 
    private geoLocation: Geolocation,
    public actionSheet: ActionSheetController) { 

  }

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
 let marker = new google.maps.Marker({
    position: userLocation,
    map: this.map,
    title: 'You'

  })
  this.markers.push(marker)
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
    !p? this.places =[]:
    this.service = new google.maps.places.AutocompleteService();
    this.service.getQueryPredictions({input: p}, (results, status)=>{
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.places = results;
        //.log(this.places[0])
      }else{
        console.log('error getting request')
      }
    })

  }
  selectPlace(p){

   this.service = new google.maps.places.PlacesService(this.map)
   var request = {
    placeId: p.place_id,
    fields: ['name', 'formatted_address', 'place_id', 'geometry']
  };
    console.log('the request ', request)
    this.service.getDetails(request,(result, status)=>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
      
        let marker = new google.maps.Marker({
          map: this.map,
          position: result.geometry.location,
          animation: google.maps.Animation.DROP
        })
        this.markers.push(marker);
         this.map.setCenter(result.geometry.location);
         this.map.setZoom(15);
         this.places =[];
         this.presentActionSheet()

      }else{
        console.log('place not found ')
      }
    })


    
  }

  async presentActionSheet(){
    const actionSheet = await this.actionSheet.create({
      header:'Confirm Call',
      cssClass:'action-sheet',
      buttons:[
        {text: 'Confirm',
         role: 'confirn',
          icon:'phone',
        handler: ()=>{
      console.log('confirm')
    }},
    {
      text: "Call me "
    }
      ]
    })
    await actionSheet.present()
  }
  

}
