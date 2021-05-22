import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatList } from '@angular/material/list';
import { Observable, Subject } from 'rxjs';
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
      this.websocket.isUserInfo()
     }
  
  uuid$: Observable<String> = this.websocket.isUuid()
  uuid: String
  userInfo$: Observable<any> = this.websocket.isUserInfo()
  userinfo: ClientData;
  refreshInfo: any
  private unsubscribe$ = new Subject();

  ngOnInit(): void {
    this.getUserData()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  getUserData(){
    this.uuid$.subscribe(data => {
      this.uuid = data
      if(this.uuid != "") {
        const reqSocket = {
          body: {},
          type: 6,
          uuid: this.uuid
        }
        this.websocket.sendMessage(reqSocket);

        this.userInfo$.subscribe(data => {
          if(data != ""){
            this.userinfo = data
            console.log("USER INFO",this.userinfo)
          }
        })
      }
    })
  }

  SellStock(company: CompaniesList) {
    const dialogRef = this.dialog.open(SellStockComponent, { width: '500px', data: { company } });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      this.getUserData()
    });
  }
}
