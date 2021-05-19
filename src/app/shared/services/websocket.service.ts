import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompaniesList, KeepAlive, ClientData, NewsData } from 'src/app/models/SendingData.model';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public list: CompaniesList[] = []
  public userInfo: ClientData
  public allNewsList: NewsData[]
  newsListWithTime: NewsData[] = []
  typeNumber: number;
  webSocket: WebSocket;
  gettingData: any;
  public _uuid$ = new BehaviorSubject<string>("")

  constructor() { }

  public isUuid() {
    return this._uuid$;
  }

  public typeChanger(isType: string): void {
    this._uuid$.next(isType)
  }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:3002/');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };

    this.webSocket.onmessage = (event) => {
      this.gettingData = JSON.parse(event.data);
      this.typeNumber = this.gettingData.type
      this.keepAlive(this.typeNumber)
      console.log(this.typeNumber)
    };
  }

  public sendMessage(data) {
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
      this.list = this.gettingData.body.list
      console.log("Data: ", this.gettingData)
    }
    else if(type === 5){
      console.log("Data: ", this.gettingData)
    }
    else if(type === 6){
      this.userInfo = this.gettingData.body
      console.log("Data: ", this.gettingData)
    }
    else if (type === 8){
      this.newsListWithTime = this.gettingData.body.news
    }
    else if (type === 7) {
      this.allNewsList = this.gettingData.body.news
      console.log("news", this.allNewsList)
    }
  }
}
