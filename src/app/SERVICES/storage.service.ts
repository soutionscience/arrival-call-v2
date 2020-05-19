import { Injectable } from '@angular/core';
import{ Storage} from '@ionic/storage'
import { Trip } from '../shared/trips.model';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
private user: {number: string, ext: string};
private trips: Trip[] =[];

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

  saveTrip = (current, destination)=>{
    let trip: Trip;
    trip ={
      start:{
        lat: current.lat,
        lng: current.lng
      },
      stop:{
        name: destination.name,
        place: destination.place
      }
    }
    // trip.start.lat = current.lat
    // trip.start.lng = current.lng;
    // trip.stop.name = destination.name;
    // trip.stop.place = destination.place
    this.trips.push(trip);
    this.storage.set('trips', this.trips)

  }
  getTrips = ()=>{
    return this.storage.get('trips')
    .then((resp)=>{
      this.trips = !resp? null: resp;
      return this.trips
    })
  }
}
