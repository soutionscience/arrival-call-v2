import { Component, OnInit } from '@angular/core';
import { CountryPickerService } from 'ngx-country-picker';
import { ApiService } from 'src/app/SERVICES/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  contries: {countryFlag: string, number: number}[]=[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.pickCountry();
    
  }
  pickCountry(){
    console.log('called')
this.api.getData().subscribe(resp=>{
console.log('resp', resp)
  
})
console.log('countries ', this.contries[0])


}
}
