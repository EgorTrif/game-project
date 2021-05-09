import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private websocket: WebsocketService) { }

  ngOnInit(): void {
  }

  getUserData(){
    const sendResponse = {
      body: {},
      type: 6,
    }
    this.websocket.sendMessage(sendResponse)
  }

}
