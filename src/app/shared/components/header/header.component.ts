import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShortInfo } from 'src/app/models/SendingData.model';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  readonly isLoggedIn$:Observable<boolean> = this.websocket.isRouteAuthenticated()
  uuid$: Observable<String> = this.websocket.isUuid()
  uuid: String
  info: ShortInfo
  searchOff: boolean = false
  currentDate = new Date()
  public _showUserInfo$ = new BehaviorSubject<boolean>(true);

  constructor(private router: Router,
    private websocket: WebsocketService) {
      this.websocket.isRouteAuthenticated(),
      this.isShowUserInfo()
     }

  ngOnInit(): void {
    this.shortInfo()
  }
  
  searchOn(){
    if(!this.searchOff){
      this.searchOff = true
    }
    else if(this.searchOff){
      this.searchOff = false
    }
  }

  login(){
    this.router.navigateByUrl('/login')
  }
  
  shortInfo(){
    this.uuid$.subscribe(data => {
      this.uuid = data
      if(this.uuid != "") {
        const reqSocket = {
        type: 15,
        body: {
    },
        uuid: this.uuid
      }
      this.websocket.sendMessage(reqSocket)

      this.websocket._gettingData$.subscribe(data => {
        if(data.type === 15){
          this.info = data.body
          console.log(this.info)
      }})
    }})
  }

  logout(): void {
    this.router.navigateByUrl('/login')
    this.websocket.closeWebSocket()
    this.websocket.setIsAuthenticated(false)
    this.websocket.isRouteAuthenticated()
    this.websocket.idSaver("")
    this.websocket.openWebSocket()
  }

  registr(){
    this.router.navigateByUrl('/registr')
  }

  public isShowUserInfo(): Observable<any> {
    return this._showUserInfo$
  }
  public setIsUserInfo(value:boolean){
    this._showUserInfo$.next(value)
  }

   openUserInfo(){
   this.setIsUserInfo(false)
  }
}
