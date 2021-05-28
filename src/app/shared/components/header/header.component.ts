import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  readonly isLoggedIn$:Observable<boolean> = this.websocket.isRouteAuthenticated()

  constructor(private router: Router,
    private websocket: WebsocketService) {
      this.websocket.isRouteAuthenticated()
     }

  ngOnInit(): void {
  }

  login(){
    this.router.navigateByUrl('/login')
  }

  logout(): void {
    this.router.navigateByUrl('/login')
    this.websocket.closeWebSocket()
    this.websocket.setIsAuthenticated(false)
    this.websocket.isRouteAuthenticated()
    this.websocket.typeChanger("")
    this.websocket.openWebSocket()
  }

  registr(){
    this.router.navigateByUrl('/registr')
  }
}
