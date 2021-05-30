import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  userinfo: boolean = true;
  chatOn: boolean = false;
  newsOn:boolean = false

  ngOnInit(): void {
  }

  openUserInfo(){
    this.userinfo=true;
    this.chatOn=false;
    this.newsOn=false;
  }
  openNews(){
    this.userinfo=false;
    this.chatOn=false;
    this.newsOn=true;
  }
  openGlobalChat(){
    this.userinfo=false;
    this.chatOn=true;
    this.newsOn=false;
  }
}
