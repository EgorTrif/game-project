import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';

import { CompaniesListRoutingModule } from './companies-list-routing.module';
import { CompaniesListComponent } from './companies-list.component';


@NgModule({
  declarations: [CompaniesListComponent],
  imports: [
    CommonModule,
    CompaniesListRoutingModule,
    MatListModule
  ]
})
export class CompaniesListModule { }
