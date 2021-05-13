import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompaniesList, KeepAlive, ClientData } from 'src/app/models/SendingData.model';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public _list$= new BehaviorSubject<CompaniesList[]>([])
  userInfo: ClientData
  typeNumber: number;
  webSocket: WebSocket;
  gettingData: any;
  public _uuid$ = new BehaviorSubject<String>("")

  constructor() { }

  public isList() {
    return this._list$;
  }

  public isUuid() {
    return this._uuid$;
  }
  
  public listChanger(isType: CompaniesList[]): void {
    this._list$.next(isType)
  }

  public typeChanger(isType: String): void {
    this._uuid$.next(isType)
  }

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
      this.typeChanger(this.gettingData.body.uuid) 
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
      this.listChanger(this.gettingData.body.list)
    }
    else if(type === 5){
      console.log("after buy", this.gettingData)
    }
    else if(type === 6){
      this.userInfo = this.gettingData.body
    }
  }
}
