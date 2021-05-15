import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CompaniesList } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import {MatList} from '@angular/material/list';
import {MatMenu} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BuyStockComponent } from './buy-stock/buy-stock.component';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit, OnDestroy {

  constructor(private buystock: BuyStockComponent,
  public websocket: WebsocketService,
  public list: MatList,
  public menu: MatMenu,
  public icon: MatIcon,
  public dialog: MatDialog) {
    this.websocket.isUuid(),
    this.buystock.isRouteBuyStock()
   }

  private unsubscribe$ = new Subject();
  refreshCompanies: any
  companies$: CompaniesList[]
  loading = true
  
  ngOnInit(): void {
    this.getAllCompanies()
    this.refreshCompanies  = setInterval(() => {
      this.getAllCompanies();
      this.loading = false
    }, 3000);
  }

  ngOnDestroy(): void {
    if(this.refreshCompanies){
      clearInterval(this.refreshCompanies)
    }
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
  BuyStock(company: CompaniesList) {
    const dialogRef = this.dialog.open(BuyStockComponent, { width: '500px', data: { company } });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  SellStock(company: CompaniesList) {
    this.buystock.setIsBuyStock(false)
    const dialogRef = this.dialog.open(BuyStockComponent, { width: '500px', data: { company } });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllCompanies(){
    const reqSocket = {
      body: {},
      type: 4,
      uuid: this.websocket._uuid$._value
    }
    this.websocket.sendMessage(reqSocket);
    this.companies$ = this.websocket.list
  }
}

