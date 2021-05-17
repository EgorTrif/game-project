import { Component, OnInit } from '@angular/core';
import { ClientData } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private websocket: WebsocketService) { }

  userinfo: ClientData

  ngOnInit(): void {
    setInterval(() => {
      this.getUserData();
    }, 3000);
    this.getUserData()
  }

  getUserData(){
    const sendResponse = {
      body: {},
      type: 6,
      uuid: this.websocket._uuid$._value
    }
    this.websocket.sendMessage(sendResponse)
    this.userinfo = this.websocket.userInfo
    
  }
}
