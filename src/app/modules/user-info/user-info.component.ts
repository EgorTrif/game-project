import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatList } from '@angular/material/list';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientData, CompaniesList } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { SellStockComponent } from './sell-stock/sell-stock.component';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  constructor(
    public websocket: WebsocketService,
    public list: MatList,
    public dialog: MatDialog) {
      this.websocket.isUuid()
     }
  
  userinfo: ClientData;
  refreshInfo: any
  private unsubscribe$ = new Subject();

  ngOnInit(): void {
   this.refreshInfo = setInterval(() => {
      this.getUserData();
    }, 3000);
  }

  ngOnDestroy(): void {
    if(this.refreshInfo){
      clearInterval(this.refreshInfo)
    }
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  getUserData(){
    const sendResponse = {
      body: {},
      type: 6,
      uuid: this.websocket._uuid$._value
    }
    this.websocket.sendMessage(sendResponse)
    this.userinfo = this.websocket.userInfo
  }

  SellStock(company: CompaniesList) {
    const dialogRef = this.dialog.open(SellStockComponent, { width: '500px', data: { company } });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      this.getUserData()
    });
  }
}
