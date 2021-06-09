import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CompaniesList } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import {MatList} from '@angular/material/list';
import {MatMenu} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BuyStockComponent } from './buy-stock/buy-stock.component';
import { skip, takeUntil } from 'rxjs/operators';
import { UserInfoComponent } from '../user-info/user-info.component';


@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit, OnDestroy {

  constructor(
  public websocket: WebsocketService,
  public buystock: BuyStockComponent,
  public userinfo: UserInfoComponent,
  public list: MatList,
  public menu: MatMenu,
  public icon: MatIcon,
  public dialog: MatDialog) {
    this.websocket.isUuid()
   }

  private unsubscribe$ = new Subject();
  uuid$: Observable<String> = this.websocket.isUuid()
  uuid: String
  refreshCompanies: any
  companies: CompaniesList[]

  ngOnInit(): void {
    this.getAllCompanies()
    this.refreshCompanies  = setInterval(() => {
      this.getAllCompanies();
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
      console.log("Result",result)
      this.userinfo.getUserData()
    });
  }

  getAllCompanies(){
    this.uuid$.subscribe(data => {
      this.uuid = data
      if(this.uuid != "") {
        const reqSocket = {
          body: {},
          type: 4,
          uuid: this.uuid
        }
        this.websocket.sendMessage(reqSocket);
        
        this.websocket._gettingData$.subscribe(data => {
          if(data.type === 4){
            this.companies = data.body.list
          }
        })
      }
    })
  }
}

