import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  countries: any [];
  arr: any[] = []
  ob: any 


  constructor(private http: HttpClient) { }

  public getData():Observable<any>{
   return this.http.get('https://arrival-call.herokuapp.com/api/country')

}
public sortData(data):Observable<any>{
 return  data.forEach(element => {
     return {countryFlag: element.flag, number: element.callingCode}
   //return ob
    
  });

}
}
