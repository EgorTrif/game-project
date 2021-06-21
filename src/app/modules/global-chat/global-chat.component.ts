import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ChatMessage } from 'src/app/models/SendingData.model';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.css']
})
export class GlobalChatComponent implements OnInit, OnDestroy {

  constructor(
    private websocket: WebsocketService) { 
      this.websocket.isUuid()
    }

  private unsubscribe$ = new Subject();
  uuid$: Observable<String> = this.websocket.isUuid()
  uuid: String
  messages: ChatMessage[] = []
  formGroup!: FormGroup;
  text = new FormControl("");
  player_name = new FormControl("");
  refreshChat: any

  ngOnInit(): void {
    this.initForm()
    this.refreshChat  = setInterval(() => {
      this.getAllMessages();
    }, 1000);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(){
    this.formGroup = new FormGroup({
      text: new FormControl(""),
      player_name: new FormControl(""),
    });
  }

  getAllMessages(){
    this.websocket._gettingData$.subscribe(data => {
      if(data.type === 10){
      console.log(data)
      this.messages.push(data.body)
      } 
    })
  }

  sendMessage(){
    this.uuid$.subscribe(data => {
      this.uuid = data
      if(this.uuid != "") {
        const reqSocket = {
        type: 10,
        body: {
        type : 1,
        text : this.formGroup.value.text
    },
        uuid: this.uuid
      }
      this.websocket.sendMessage(reqSocket)
    }})

    this.formGroup.controls['text'].reset()
    }
  }
