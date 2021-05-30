import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatMessage } from 'src/app/models/SendingData.model';
import { ChatService } from 'src/app/shared/services/chat.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.css']
})
export class GlobalChatComponent implements OnInit {

  constructor(
    private websocket: WebsocketService,
    private chatService: ChatService,
    public userinfo: UserInfoComponent) { 
      this.websocket.isUuid()
    }

  uuid$: Observable<String> = this.websocket.isUuid()
  uuid: String
  messages: ChatMessage[] = []
  formGroup!: FormGroup;
  text = new FormControl("");
  player_name = new FormControl("");
  refreshChat: any

  ngOnInit(): void {
    this.userinfo.getUserData()
    this.initForm()
    this.refreshChat  = setInterval(() => {
      this.getAllMessages();
    }, 1000);
    
  }

  initForm(){
    this.formGroup = new FormGroup({
      text: new FormControl(""),
      player_name: new FormControl({value: this.userinfo.userinfo.login, disabled: true}),
    });
  }

  getAllMessages(){
    this.chatService.chatWebsocket().subscribe(data => {
      if(data.type === 10){
      this.messages.push(data.body)
      }
      
    })
    console.log(this.messages)
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
