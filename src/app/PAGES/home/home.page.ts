import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/SERVICES/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( private storageService: StorageService ) { }
  user:{} ={}

  ngOnInit() {
    this.getUser()
    console.log('home!!', this.user)
  }
  getUser(){
    this.storageService.getUser().then((resp)=> {this.user = resp; console.log('user ', this.user)})
  }

}
