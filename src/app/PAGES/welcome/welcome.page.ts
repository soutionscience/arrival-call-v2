import { Component, OnInit } from '@angular/core';
import { CountryPickerService } from 'ngx-country-picker';
import { ApiService } from 'src/app/SERVICES/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/SERVICES/storage.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  countries: {image: string, number: number}[]=[];
  numberForm: FormGroup

  constructor(private api: ApiService, private fb: FormBuilder, private storage: StorageService,
    private navCtrl: NavController ) { }

  ngOnInit() {
    this.pickCountry();
    this.createForm()
    
  }
  pickCountry(){
    this.api.getData()
    .subscribe(resp=>{
       this.countries = resp
})
}

createForm(){
  this.numberForm = this.fb.group({
    ext: ['', [Validators.required]],
    number:['', [Validators.required]]
  })
}

submit(){
  this.storage.saveUser(this.numberForm.value)
this.navCtrl.navigateForward('home')

}
getUser(){
  this.storage.getUser()
  .then((resp)=> console.log('user is', resp))
}

}
