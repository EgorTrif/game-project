import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatList, MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { CompaniesListRoutingModule } from './companies-list-routing.module';
import { CompaniesListComponent } from './companies-list.component';
import { BuyStockComponent } from './buy-stock/buy-stock.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CompaniesListComponent, BuyStockComponent, UserInfoComponent],
  imports: [
    CommonModule,
    CompaniesListRoutingModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CompaniesListComponent, UserInfoComponent],
  providers: [ BuyStockComponent,
    { provide: MatDialogRef,
    useValue: {}
  },
  {
    provide: MAT_DIALOG_DATA,
    useValue: {}
  }, 
MatList, MatMenu, MatIcon]
})
export class CompaniesListModule { }
