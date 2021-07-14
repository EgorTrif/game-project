import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatList } from '@angular/material/list';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientData, CompaniesList } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { BuyStockComponent } from '../companies-list/buy-stock/buy-stock.component';
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
  
  uuid$: Observable<String> = this.websocket.isUuid()
  uuid: String
  userinfo: ClientData;
  refreshInfo: any
  private unsubscribe$ = new Subject();
  silver = false
  gold = true
  companies = true

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

        this.websocket._gettingData$.subscribe( data => {
          if(data.type === 6){
            this.userinfo = data.body
          }
        })
      }
    })
  }

  sellStock(company: CompaniesList) {
    const dialogRef = this.dialog.open(SellStockComponent, { width: '500px', data: { company } });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      console.log("Result",result)
      this.getUserData()
    });
  }

  buyStock(company: CompaniesList) {
    const dialogRef = this.dialog.open(BuyStockComponent, { width: '500px', data: { company } });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      console.log("Result",result)
      this.getUserData()
    });
  }

  openSilver(){
    if(this.silver===true){
      this.silver = false
      this.gold = true
      this.companies = true
    }
  }

  openGold(){
    if(this.gold===true){
      this.silver = true
      this.gold = false
      this.companies = true
    }
  }

  openCompanies(){
    if(this.companies===true){
      this.silver = true
      this.gold = true
      this.companies = false
    }
  }

}
