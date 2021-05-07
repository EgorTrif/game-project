import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CompaniesList } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit, OnDestroy {

  constructor(public websocket: WebsocketService) { }

  refreshCompanies: any
  companies$: CompaniesList[]
  
  ngOnInit(): void {
    this.getAllCompanies()
    this.refreshCompanies  = setInterval(() => {
      this.getAllCompanies(); 
    }, 3000);
  }

  ngOnDestroy(): void {
    if(this.refreshCompanies){
      clearInterval(this.refreshCompanies)
    }
  }

  getAllCompanies(){
    const reqSocket = {
      body: {},
      type: 4
    }
    this.websocket.sendMessage(reqSocket);
    this.companies$ = this.websocket.list
    console.log("list:", this.companies$)
  }
}

