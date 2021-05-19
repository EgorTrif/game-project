import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientData } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  constructor(private websocket: WebsocketService) { }
  

  userinfo: ClientData;
  refreshInfo: any

  ngOnInit(): void {
   this.refreshInfo = setInterval(() => {
      this.getUserData();
    }, 3000);
    this.getUserData()
  }

  ngOnDestroy(): void {
    if(this.refreshInfo){
      clearInterval(this.refreshInfo)
    }
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
