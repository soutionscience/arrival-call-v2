import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { StorageService } from 'src/app/SERVICES/storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {} from 'google-maps';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { ConfirmActionSheetComponent } from 'src/app/COMPONENTS/confirm-action-sheet/confirm-action-sheet.component';
import { Trip } from 'src/app/shared/trips.model';



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
showAction: boolean;
currentPosition:  {};
destinationPosition: {}
trips: Trip []; 
//auto complete stuff



@ViewChild('map',{static: false}) mapElement: ElementRef

  constructor( private storageService: StorageService, 
    private geoLocation: Geolocation,
    public actionSheet: ActionSheetController,
    public modalCtrl: ModalController,
    private navCtr: NavController) { 

  }

  user:{} ={}

  ngOnInit() {
    
  }
  ionViewWillEnter(){
 // this.initializeMap();
  this.getUser()
 this.getLocation();
 this.showAction = false;
 this.getTrips()
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
    this.storageService.getUser().then((resp)=> {this.user = resp})
  }
  getLocation(){
    this.geoLocation.getCurrentPosition().then((resp)=>{
    let lat = resp.coords.latitude;
    let lng = resp.coords.longitude
    this.initializeMap(lat, lng);
    this.currentPosition = {lat, lng }

    }).catch((error)=>{
      // launch turn on internet connection pop up or user denied geolocation
      console.log("error getting location", error)
    })

  }
  reset(){
    this.places =[];
    this.showAction = false
  }

  search(p){
    !p? this.reset():
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
    //console.log('the request ', request)
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
        this.destinationPosition ={name: result.name, place: p};
         this.saveTrip()
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
        icon:'call-outline',
        handler: ()=>{
      this.confirm()
    }},
    {
      text: "Call me when near ",
      role: "",
      icon: 'time',
      handler: ()=>{
        this.presentModal()
      }
    },
    {
      text: "Cancel ",
      role: "cancel",
      icon: 'close',
      handler: ()=>{
        console.log('timer')
      }
    }
      ]
    })
    await actionSheet.present()
  }

 async presentModal(){
   const modal = await this.modalCtrl.create({
     component: ConfirmActionSheetComponent
   });
   return await modal.present()
 }

 saveTrip(){
   this.storageService.saveMYTrips(this.currentPosition, this.destinationPosition)
 }
 getTrips(){
   this.storageService.getTrips().then((resp)=>{
     this.trips = resp;
    // console.log('returned ', this.trips)
   })
 }

 confirm(){
   this.navCtr.navigateForward('confirm')
 }
  

}
