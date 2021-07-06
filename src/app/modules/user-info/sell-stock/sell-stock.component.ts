import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { CompaniesList } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';


@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css']
})
export class SellStockComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<SellStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{ company: CompaniesList},
    public dialog: MatDialog,
    private websocket: WebsocketService,
    private _snackBar: MatSnackBar,
    private header: HeaderComponent) {
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
          if (this.amountStoks.value.AmountForSell < 0){
            this._snackBar.open('You cannnot sell negative amount of stocks', 'x', {
              duration: 5000,
              horizontalPosition: "center",
              verticalPosition: "top",
              panelClass: ['red-snackbar']
            })
          }
          else {
            this.websocket.sendMessage(reqSocket)
            this.header.shortInfo()
          }
      }});
     }
}
