import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  constructor( public websocket: WebsocketService) { }
  
  ngOnInit(): void {
    this.websocket.openWebSocket();
  }

  ngOnDestroy(): void {
    this.websocket.closeWebSocket();
  }

}
