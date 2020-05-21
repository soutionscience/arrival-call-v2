import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from "@ionic/core";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})

export class ConfirmPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 4.5,
    spaceBetween: 1,
   // centeredSlides: true,
    speed: 400
  };
  animals: string[] = ["Tiger", "Lion", "Elephant", "Fox", "Wolf"];
 constructor(private pickerController: PickerController) { }

  ngOnInit() {
  }

  async showPicker() {
    let options: PickerOptions= {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            console.log(value);
          }
        }
      ],
      columns:[{
        name:'Animals',
        options:this.getColumnOptions()
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present()
  }

  getColumnOptions(){
    let options = [];
    this.animals.forEach(x => {
      options.push({text:x,value:x});
    });
    return options;
  }


  // remember to check distance to determing geo boundary

}
