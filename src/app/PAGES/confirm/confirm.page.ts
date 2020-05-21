import { Component, OnInit } from '@angular/core';
import { PickerController, AlertController } from '@ionic/angular';
import { PickerOptions } from "@ionic/core";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})


  // remember to check distance to determing geo boundary

export class ConfirmPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 4.5,
    spaceBetween: 1,
   // centeredSlides: true,
    speed: 400
  };
  destination: string = 'Sarit center Rounderbout, Westlands Nairobi'
  animals: number[] = [0, 1, 2, 3,];
  plants: number[] = [0, 5, 10, 15, 20, 25,30, 35, 40, 45,50, 55, 60];
 constructor(private pickerController: PickerController, private alertCtrl: AlertController) { }
 selectedTime: any ={};

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
            this.formatPickerValue(value)
          }
        }
      ],
      columns:[{
        name:'Hour',
        options:this.getColumnOptions()
      },
      {
        name: 'Hr',
        options: [{text: 'Hr', value: 'Hr'}]

      },
    {
      name: 'Minutes',
      options: this.getSecondColumnOptions()
    },

    {
      name: 'Mins',
      options: [{text: 'Mins', value: null}]

    }
  ]
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
  getSecondColumnOptions(){
    let options = []
    this.plants.forEach(x=>{
      options.push({text:x, value:x})
    })
    return options;
  }
  getHour(){
    let options =[]
    options.push({text: 'Hr', val: null})
    return options
  }
  // format selected time
  formatPickerValue(value){
    let time ={}
    time ={hour: value.Hour.value, min: value.Minutes.value}
    this.selectTime(time);
  }


 //selected Time
 selectTime(time){
   this.selectedTime = {hour: time.hour, min: time.min}
   console.log(' selected ', this.selectedTime);
   this.presentAlertConfirm(this.selectedTime)
 }

 ///alert confirm

 async presentAlertConfirm(time){
   const alert = await this.alertCtrl.create(
     {
       header: 'Confirm',
       message: `Alert you ${time.hour> 0? `${time.hour} hr(s) `: ''}<strong>${time.min>0? `${time.min} mins `: ''}</strong> before you arrive at <strong>${this.destination}</strong>?`,
       buttons:[{
        text: 'Cancel',
        role: 'cancel',
        cssClass:'myDanger',
        handler:()=>{
          console.log('cancelled')
        }
       },
       {text: 'Okay',
      handler:()=>{
        console.log('accepted')
      }}

        
       ]
     }
   )
   alert.present()
 }


}
