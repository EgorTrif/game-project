import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { CompaniesList, ClientData, NewsData } from 'src/app/models/SendingData.model';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private readonly _isAuthenticated$ = new BehaviorSubject<boolean>(false);

  public _list$ = new BehaviorSubject<CompaniesList[]>([])
  public _userInfo$ = new BehaviorSubject<any>("")
  public _allNewsList$ = new BehaviorSubject<NewsData[]>([])
  newsListWithTime: NewsData[] = []
  typeNumber: number;
  webSocket: WebSocket;
  public gettingData: any;
  public _uuid$ = new BehaviorSubject<string>("")

  constructor() { 
    this.isRouteAuthenticated()
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

  public isList(){
    return this._list$;
  }
  
  public isUserInfo(){
    return this._userInfo$;
  }

  public isNews(){
    return this._allNewsList$;
  }

  public userInfoChanger(user: ClientData){
    this._userInfo$.next(user)
  }

  public listChanger(list: CompaniesList[]){
    this._list$.next(list)
  }

  public newsChanger(news: NewsData[] ){
    this._allNewsList$.next(news)
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
      this.allRequests(this.typeNumber)
      console.log(this.typeNumber)
    };
  }

  public sendMessage(data) {
    return this.webSocket.send(JSON.stringify(data))
  };

  public closeWebSocket(){
    this.webSocket.close();
  }

  allRequests(type) {
    if(type === 1){
      this.typeChanger(this.gettingData.body.uuid) 
      this.setIsAuthenticated(true)
      console.log("logged in", this.gettingData.body)
    }
    else if(type === 3){
      this.keepAlive()
    }
    else if(type === 4){
      this.listChanger(this.gettingData.body.list)
      console.log("Data: ", this.gettingData)
    }
    else if(type === 7){
      this.newsChanger(this.gettingData.body.news)
      console.log("Data: ", this.gettingData)
    }
    else if(type === 5){
      console.log("Data: ", this.gettingData)
    }
    else if(type === 6){
      this.userInfoChanger(this.gettingData.body)
      console.log("Data: ", this.gettingData)
    }
    else if (type === 8){
      this.newsListWithTime = this.gettingData.body.news
    }
    else if(type === 9){
      console.log("Data: ", this.gettingData)
    }
    else if(type === 10){
      console.log("Data: ", this.gettingData)
    }
  }

    keepAlive(){
      if(this.gettingData.type === 3){
        const sendRequest = {
          body: {},
          type: 3
        }
        this.sendMessage(sendRequest)
      }
  }

}
