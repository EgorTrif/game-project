import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompaniesList } from 'src/app/models/SendingData.model';
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
  private websocket: WebsocketService) {
    this.websocket.isUuid()
   }

  buy$ = true;
  amountStoks = new FormGroup({
    AmountForBuy: new FormControl(''),
    })

  message = ''

  ngOnInit(): void {
  }

  BuyStock() {
    const sendResponse = {
      type: 5,
      body: {
        uuid: this.data.company.uuid,
        amount: this.amountStoks.value.AmountForBuy,
        cost: Number(this.data.company.cost)
      },
      uuid: this.websocket._uuid$._value
    }
    this.websocket.sendMessage(sendResponse)
    console.log(sendResponse)
  }
}
