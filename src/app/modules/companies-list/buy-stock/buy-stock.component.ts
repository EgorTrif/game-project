import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { CompaniesList } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.css']
})
export class BuyStockComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BuyStockComponent>,
  @Inject(MAT_DIALOG_DATA) public data:{ company: any},
  public dialog: MatDialog,
  private websocket: WebsocketService,
  private _snackBar: MatSnackBar,
  private header: HeaderComponent) {
    this.websocket.isUuid()
   }

  private unsubscribe$ = new Subject();
  uuid$: Observable<String> = this.websocket.isUuid()
  uuid: String 
  buy$ = true;
  amountStoks = new FormGroup({
    AmountForBuy: new FormControl(''),
    })

  message = ''

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  BuyStock() {
    this.uuid$.subscribe(data => {
      this.uuid = data
      if(this.uuid != "") {
        let reqSocket: any
        if(this.data.company.cost){
      reqSocket = {
      type: 5,
      body: {
        uuid: this.data.company.uuid,
        amount: Number(this.amountStoks.value.AmountForBuy),
        cost: Number(this.data.company.cost)
      },
      uuid: this.uuid
        }
      } else if (this.data.company.silver.cost) {
        reqSocket = {
          type: 5,
          body: {
            uuid: this.data.company.uuid,
            amount: Number(this.amountStoks.value.AmountForBuy),
            cost: Number(this.data.company.silver.cost)
          },
          uuid: this.uuid
      }
    }
      if (this.amountStoks.value.AmountForBuy < 0){
        this._snackBar.open('You cannnot buy negative amount of stocks', 'x', {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ['red-snackbar']
        })
      }
      else {
        console.log("Soket",reqSocket)
        this.websocket.sendMessage(reqSocket)
        this.header.shortInfo()
      }
    }});
  }
}
