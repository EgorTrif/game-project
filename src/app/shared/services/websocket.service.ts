import { Injectable } from '@angular/core';
import { KeepAlive, LoginData } from 'src/app/models/SendingData.model';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  typeNumber: number;
  webSocket: WebSocket;

  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:3002/');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const getData = JSON.parse(event.data);
      this.typeNumber = getData.type
      this.keepAlive(this.typeNumber)
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
    if(type === 3){
      const sendResponse: KeepAlive = {
        body: {},
        type: 3
      }
      this.sendMessage(sendResponse)
      console.log("Websocket is alive")
    }
    else if(type === 1){
      console.log("logged in")
    }
  }
  
}
