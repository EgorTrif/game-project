import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  showList = false
  showNews = true
  showInfo = true
  readonly _showUserInfo$:Observable<boolean> = this.header.isShowUserInfo()

  constructor(public header: HeaderComponent) {
    this.header.isShowUserInfo()
   }

   ngOnInit(): void {
  }

  openList(){
    if(this.showList===true){
      this.showList = false
      this.showNews = true
      this.showInfo = true
    }
  }

  openNews(){
    if(this.showNews===true){
      this.showList = true
      this.showNews = false
      this.showInfo = true
    }
  }

  openUserinfo(){
    if(this.showInfo===true){
      this.showList = true
      this.showNews = true
      this.showInfo = false
    }
  }

}
