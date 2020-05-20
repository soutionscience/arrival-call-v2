import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})

export class ConfirmPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2.4,
    spaceBetween: 0,
    centeredSlides: true,
    speed: 400
  };
 constructor() { }

  ngOnInit() {
  }


  // remember to check distance to determing geo boundary

}
