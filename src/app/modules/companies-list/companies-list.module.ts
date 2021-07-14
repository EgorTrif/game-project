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
import { NewsComponent } from '../news/news.component';
import { SellStockComponent } from '../user-info/sell-stock/sell-stock.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CompaniesListComponent, BuyStockComponent, UserInfoComponent, NewsComponent, SellStockComponent],
  imports: [
    CommonModule,
    CompaniesListRoutingModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CompaniesListComponent, UserInfoComponent, NewsComponent],
  providers: [ BuyStockComponent,
    SellStockComponent,
    UserInfoComponent,
    { provide: MatDialogRef,
    useValue: {}
  },
  {
    provide: MAT_DIALOG_DATA,
    useValue: {}
  }, 
MatList, MatMenu, MatIcon, MatButtonModule]
})
export class CompaniesListModule { }
