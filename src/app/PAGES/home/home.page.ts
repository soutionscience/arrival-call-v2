import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
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
markers: any [] =[];
service: any;
infowindow: any;
places: any [];
//auto complete stuff
GoogleAutocomplete: google.maps.places.AutocompleteService;
autocomplete: { input: string; };
autocompleteItems: any[];

@ViewChild('map',{static: false}) mapElement: ElementRef

  constructor( private storageService: StorageService, 
    private geoLocation: Geolocation,
    public zone: NgZone ) { 
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
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
 autoComplete(p){
   !p? this.autocompleteItems =[]:
   this.GoogleAutocomplete.getPlacePredictions({input:p}, (predictions, status)=>{
     if(status = google.maps.places.PlacesServiceStatus.OK){
       this.autocompleteItems =[];
       this.zone.run(()=>{
         predictions.forEach((prediction)=>{
           this.autocompleteItems.push(prediction);
           console.log(prediction)
         })
       })
     }else{
       console.log('error is noma')
     }


   })
 }
  search(p){
    console.log('getting ', p);
    let request ={
      query: p,
      fields: ['name', 'geometry']
    }
    this.service = new google.maps.places.PlacesService(this.map)
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
   // console.log(p);
    this.map.setCenter(p.geometry.location);
    this.map.setZoom(15)
    let marker = new google.maps.Marker({
      map: this.map,
      position: p.geometry.location,
      animation: google.maps.Animation.DROP
    })
    //.log('what is in ', this.markers)
    this.markers.push(marker)
  }
  

}
