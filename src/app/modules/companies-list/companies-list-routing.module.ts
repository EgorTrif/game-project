import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from '../user-info/user-info.component';
import { BuyStockComponent } from './buy-stock/buy-stock.component';

import { CompaniesListComponent } from './companies-list.component';

const routes: Routes = [{ path: '', component: CompaniesListComponent },
{path: '', component: BuyStockComponent },
{path: '', component: UserInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesListRoutingModule { }
