import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { ChatMessage } from 'src/app/models/SendingData.model';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private readonly _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  webSocket: WebSocket;
  public _gettingData$ = new BehaviorSubject<any>(undefined)
  public _uuid$ = new BehaviorSubject<string>("")
  messages: ChatMessage[] = []

  constructor() { 
    this.isRouteAuthenticated()
    this.isAllData()
  }

  public isAllData(): Observable<any>{
  return this._gettingData$
  }

  public setIsData(data: any){
    this._gettingData$.next(data)
  }

  public isRouteAuthenticated() {
    return this._isAuthenticated$;
  }

  public setIsAuthenticated(isAuth: boolean): void {
    this._isAuthenticated$.next(isAuth)
  }

  public isUuid() {
    return this._uuid$;
  }

  public idSaver(isType: string): void {
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
      this.setIsData(JSON.parse(event.data))
      console.log("data", JSON.parse(event.data))
      if (JSON.parse(event.data).type === 10){
        this.messages.push(JSON.parse(event.data).body)
      }
      this._gettingData$.subscribe(data => { 
        if(data.type === 3){
          this.keepAlive()
        }
      })
    };
  }

  public sendMessage(data) {
    return this.webSocket.send(JSON.stringify(data))
  };

  public closeWebSocket(){
    this.webSocket.close();
  }

    keepAlive(){
        const sendRequest = {
          body: {},
          type: 3
        }
        this.sendMessage(sendRequest)
      }
}
