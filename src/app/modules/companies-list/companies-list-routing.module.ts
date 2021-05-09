import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyStockComponent } from './buy-stock/buy-stock.component';

import { CompaniesListComponent } from './companies-list.component';

const routes: Routes = [{ path: '', component: CompaniesListComponent },
{path: '', component: BuyStockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesListRoutingModule { }
