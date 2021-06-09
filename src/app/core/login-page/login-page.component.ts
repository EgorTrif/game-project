import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { LoginData } from 'src/app/models/SendingData.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { skip} from 'rxjs/operators';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  

  private unsubscribe$ = new Subject();
  readonly isLoggedIn$:Observable<boolean> = this.websocket.isRouteAuthenticated()
  formGroup!: FormGroup;

  login = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);
  
  errorMessage: string = ""

  constructor(private router: Router,
    public websocket: WebsocketService,
    private _snackBar: MatSnackBar) {
      this.websocket.isRouteAuthenticated()
     }


  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  initForm(){
    this.formGroup = new FormGroup({
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

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

      this.websocket._gettingData$.pipe(skip(1)).subscribe(data => {
        if(data.type === 1){
          if(data.body.result === true){
          this.websocket.setIsAuthenticated(true)
          this.websocket.idSaver(data.body.uuid)
          this.router.navigateByUrl('/home')
          this._snackBar.open('You have successfully loged in!', 'x', {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
          }
          else if(data.body.result === false){
            this._snackBar.open('Wrong login or password. Please, try again!', 'x', {
                      duration: 5000,
                      horizontalPosition: "center",
                      verticalPosition: "top",
                      panelClass: ['red-snackbar']
                    })
          }
        }
      })
}
}
}
