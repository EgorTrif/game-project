import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompaniesList } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';


@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css']
})
export class SellStockComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SellStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{ company: CompaniesList},
    public dialog: MatDialog,
    private websocket: WebsocketService) {
      this.websocket.isUuid()
     }

     public _isSell$ = new BehaviorSubject<boolean>(true);
     sell$: Observable<boolean> = this._isSell$
     amountStoks = new FormGroup({
       AmountForSell: new FormControl('')
       })
   
     message = ''
   
     ngOnInit(): void {
     }
   
     SellStock() {
       const sendResponse = {
         type: 9,
         body: {
           uuid: this.data.company.uuid,
           amount: this.amountStoks.value.AmountForSell,
         },
         uuid: this.websocket._uuid$._value
       }
       this.websocket.sendMessage(sendResponse)
     }
}
