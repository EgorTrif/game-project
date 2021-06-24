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
  showUserInfo$:  Observable<boolean> = this.header.isShowUserInfo()

  constructor(private header: HeaderComponent) {
    this.header.isShowUserInfo()
   }

  openList(){
    if(this.showList===true){
      this.showList = false
      this.showNews = true
      this.header.openUserInfo(true)
    }
  }

  openNews(){
    if(this.showNews===true){
      this.showList = true
      this.showNews = false
      this.header.openUserInfo(true)
    }
  }

  openUserInfo(){
    this.showUserInfo$.subscribe(data => {
      if(data===true){
          this.showList = true
          this.showNews = true
          this.header.openUserInfo(false)
      }
    })
    
  }

  ngOnInit(): void {
  }

}
