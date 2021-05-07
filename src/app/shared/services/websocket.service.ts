import { Injectable } from '@angular/core';
import { CompaniesList, KeepAlive, LoginData } from 'src/app/models/SendingData.model';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  list: CompaniesList[] = []
  typeNumber: number;
  webSocket: WebSocket;
  gettingData: any;

  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:3002/');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      this.gettingData = JSON.parse(event.data);
      this.typeNumber = this.gettingData.type
      console.log("Data: ", this.gettingData)
      this.keepAlive(this.typeNumber)
      console.log(this.typeNumber)
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(data): any {
    return this.webSocket.send(JSON.stringify(data))
  };

  public closeWebSocket(){
    this.webSocket.close();
  }

  keepAlive(type) {
    if(type === 1){
      console.log("logged in")
    }
    else if(type === 3){
      const sendResponse: KeepAlive = {
        body: {},
        type: 3
      }
      this.sendMessage(sendResponse)
    }
    else if(type === 4){
      this.list = this.gettingData.body.list
    }
  }
}
