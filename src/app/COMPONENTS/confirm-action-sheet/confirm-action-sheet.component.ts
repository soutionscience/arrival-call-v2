import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-action-sheet',
  templateUrl: './confirm-action-sheet.component.html',
  styleUrls: ['./confirm-action-sheet.component.scss'],
})
export class ConfirmActionSheetComponent implements OnInit {

  constructor(public actionSheetController: ActionSheetController) { 
    //console.log('action sheet started')
  }

  ngOnInit() {}

  async presentActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: 'call me',
      buttons:[
        {text: 'Confirm',
      role: 'confirm',
    icon: 'share',
  handler: ()=>{
    console.log('Confirm Clecked')
  }},
  {
    text: 'Call me when near',
    icon: 'time',
    handler: ()=>{
      console.log('set timer')
    }},
    {
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        console.log('Delete clicked');
      }
  }
      ]
    })
    await actionSheet.present()
  }
 

}
