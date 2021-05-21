import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
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

  constructor(
  public websocket: WebsocketService,
  public buystock: BuyStockComponent,
  public list: MatList,
  public menu: MatMenu,
  public icon: MatIcon,
  public dialog: MatDialog) {
    this.websocket.isUuid()
   }

  private unsubscribe$ = new Subject();
  refreshCompanies: any
  companies$: CompaniesList[]
  loading = true

  ngOnInit(): void {
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
      this.getAllCompanies()
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

