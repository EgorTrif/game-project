import { Injectable } from '@angular/core';
import { LoginData } from 'src/app/models/SendingData.model';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  typeNumber = 0;
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
  
}
