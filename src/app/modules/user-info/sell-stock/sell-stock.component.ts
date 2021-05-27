import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { CompaniesList } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';


@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css']
})
export class SellStockComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<SellStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{ company: CompaniesList},
    public dialog: MatDialog,
    private websocket: WebsocketService) {
      this.websocket.isUuid()
     }
  
    
    
    private unsubscribe$ = new Subject();
    uuid$: Observable<String> = this.websocket.isUuid()
    uuid: String
     sell$ = true 
     amountStoks = new FormGroup({
       AmountForSell: new FormControl('')
       })
   
     message = ''
   
     ngOnInit(): void {
     }

     ngOnDestroy(): void {
      this.unsubscribe$.next()
      this.unsubscribe$.complete()
    }
   
     SellStock() {
      this.uuid$.subscribe(data => {
        this.uuid = data
        if(this.uuid != "") {
          const reqSocket = {
            body: {
              uuid: this.data.company.uuid,
              amount: Number(this.amountStoks.value.AmountForSell)},
            type: 9,
            uuid: this.uuid
          }
          this.websocket.sendMessage(reqSocket);
      }});
     }
}
