import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsData } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  constructor(private websocket: WebsocketService) { }
  

  allNews: NewsData[]
  refreshNews: any

  ngOnInit(): void {
    setTimeout(() => {
      this.getAllNews();}, 1000);
    this.refreshNews = setInterval(() => {
      this.getAllNews();
    }, 5000);
  }

  ngOnDestroy(): void {
    if(this.refreshNews){
      clearInterval(this.refreshNews)
    }
  }

  getAllNews(){
    const sendResponse = {
      body: {
        amount: -1
      },
      type: 8,
      uuid: this.websocket._uuid$._value
    }
    this.websocket.sendMessage(sendResponse)
    this.allNews = this.websocket.allNewsList
  }

}
