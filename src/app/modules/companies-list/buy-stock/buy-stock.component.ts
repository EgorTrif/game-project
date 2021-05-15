import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { BuyStock, CompaniesList } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.css']
})
export class BuyStockComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BuyStockComponent>,
  @Inject(MAT_DIALOG_DATA) public data:{ company: CompaniesList},
  public dialog: MatDialog,
  private websocket: WebsocketService) { }

  amountStoks = new FormGroup({
    AmountForBuy: new FormControl(''),
    AmountForSell: new FormControl('')
    })

  message = ''
  public _buyStock$ = new BehaviorSubject<boolean>(true);

  public isRouteBuyStock() {
    return this._buyStock$;
  }

  public setIsBuyStock(isBuyStock: boolean): void {
    this._buyStock$.next(isBuyStock)
  }

  ngOnInit(): void {
  }

  BuyStock() {
    const sendResponse: BuyStock = {
      type: 5,
      body: {
        uuid: this.data.company.uuid,
        amount: this.amountStoks.value.AmountForBuy,
        cost: this.data.company.cost
      }
    }
    this.websocket.sendMessage(sendResponse)
  }

  SellStock() {
    const sendResponse: BuyStock = {
      type: 5,
      body: {
        uuid: this.data.company.uuid,
        amount: this.amountStoks.value.AmountForSell,
        cost: this.data.company.cost
      }
    }
    this.websocket.sendMessage(sendResponse)
  }
}
