import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompaniesList } from 'src/app/models/SendingData.model';

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.css']
})
export class BuyStockComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BuyStockComponent>,
  @Inject(MAT_DIALOG_DATA) public data:{ company: CompaniesList},
  public dialog: MatDialog) { }

  message = '';
  buyStock: boolean;

  ngOnInit(): void {
  }


}
