import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsData } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  constructor(private websocket: WebsocketService) { 
    this.websocket.isUuid()
  }
  
  uuid$: Observable<String> = this.websocket.isUuid()
  uuid: String
  allNews: NewsData[]
  refreshNews: any

  ngOnInit(): void {
    this.getAllNews()
    this.refreshNews  = setInterval(() => {
      this.getAllNews();
    }, 3000);
  }

  ngOnDestroy(): void {
    if(this.refreshNews){
      clearInterval(this.refreshNews)
    }
  }

  getAllNews(){
    this.uuid$.subscribe(data => {
      this.uuid = data
      if(this.uuid != "") {
        const reqSocket = {
          body: {
            amount: -1
          },
          type: 8,
          uuid: this.uuid
        }
        this.websocket.sendMessage(reqSocket)

        this.websocket._gettingData$.subscribe(data => {
          if (data.type === 7){
            this.allNews = data.body.news
          }
        })
      }
    })
  }
}
