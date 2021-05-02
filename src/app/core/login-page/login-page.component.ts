import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { LoginData } from 'src/app/models/SendingData.model';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  readonly isLoggedIn$:Observable<boolean> //= this.auth.isRouteAuthenticated()
  loginForm = true;
  formGroup!: FormGroup;

  login = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);
  
  errorMessage: string = ""

  constructor(private router: Router,
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
    public websocket: WebsocketService) {
     }

  ngOnInit(): void {
    this.websocket.openWebSocket();
    this.initForm()
    // if (this.tokenStorage.getToken()) {
    // this.auth.setIsAuthenticated(true)
    // this.loginForm = false
    // }
  }

  ngOnDestroy(): void {
    this.websocket.closeWebSocket();
  }

  initForm(){
    this.formGroup = new FormGroup({
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  // allowRouteAccess(access: boolean):void{
  //   this.auth.setIsAuthenticated(access);
  //   this.auth.isRouteAuthenticated();
  // }

  getErrorMessage() {
    if (this.login.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return
  }

  onSubmit(){
    if(this.formGroup.valid) {
      const sendData: LoginData = {
        body: {
          login: this.formGroup.value.login,
        password: this.formGroup.value.password
        },
        type: 1,
      }
      this.websocket.sendMessage(sendData)
      console.log(sendData)
      // this.auth.login(this.formGroup.value).subscribe(
    //   data => {
    //     if (data.IsError === false) {
    //     this.auth.setIsAuthenticated(true)
    //     this.tokenStorage.saveToken(data.Data.token);
    //     this.allowRouteAccess(true)
    //     this.router.navigateByUrl('/home')
    //     } else {
    //       this.errorMessage = data.ErrMsg
    //     } 
    //   },
    // );
    }
  }
}
