import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private websocket: WebsocketService) { }

  gettingData: any

  chatWebsocket(): Observable<any>{
    this.websocket.webSocket.onmessage = (event) => {
      this.gettingData = JSON.parse(event.data);
    };
    return of(this.gettingData)
  }
}
