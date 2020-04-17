import { Component, OnInit } from '@angular/core';
import { CountryPickerService } from 'ngx-country-picker';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  contries: any[];

  constructor(private countryPicker: CountryPickerService) { }

  ngOnInit() {
    this.pickCountry()
  }
  pickCountry(){
    console.log('called')
    this.countryPicker.getCountries()
    .subscribe(resp=> console.log('resp', resp),error=>{
      console.log('is there an error ', error)
    })
  }

}
