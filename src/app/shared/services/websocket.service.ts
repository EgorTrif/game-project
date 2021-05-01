import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { LoginData } from 'src/app/models/SendingData.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocket: WebSocket;
  loginData: LoginData[] = [];

  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:3002');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const loginData = JSON.parse(event.data);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(loginData: LoginData) {
    this.webSocket.send(JSON.stringify(loginData))
  };

  public closeWebSocket(){
    this.webSocket.close();
  }
  
}
