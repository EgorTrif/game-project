import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ChatMessage } from 'src/app/models/SendingData.model';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.css']
})
export class GlobalChatComponent implements OnInit, OnDestroy {

  constructor(
    public websocket: WebsocketService,
    public header: HeaderComponent) { 
      this.websocket.isUuid()
    }

  private unsubscribe$ = new Subject();
  uuid$: Observable<String> = this.websocket.isUuid()
  uuid: String
  formGroup!: FormGroup;
  text = new FormControl("");
  refreshChat: any
  login: string;

  ngOnInit(): void {
    this.initForm()
    this.websocket._gettingData$.subscribe(data => {
      if(data.type === 15){
        this.login = data.body.login
    }})
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(){
    this.formGroup = new FormGroup({
      text: new FormControl(""),
    });
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
