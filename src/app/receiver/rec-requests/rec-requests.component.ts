import { Component } from '@angular/core';

@Component({
  selector: 'app-rec-requests',
  templateUrl: './rec-requests.component.html',
  styleUrls: ['./rec-requests.component.css']
})
export class RecRequestsComponent {
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';
  request:any[]=[]
}
