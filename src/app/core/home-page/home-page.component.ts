import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  userinfo = true

  ngOnInit(): void {
  }

  switchTabs() {
    if(this.userinfo){
      this.userinfo = false
    }
    else {
      this.userinfo = true
    }
  }

}
