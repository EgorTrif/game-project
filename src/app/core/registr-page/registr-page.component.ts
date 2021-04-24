import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registr-page',
  templateUrl: './registr-page.component.html',
  styleUrls: ['./registr-page.component.css']
})
export class RegistrPageComponent implements OnInit {
  
  readonly isLoggedIn$:Observable<boolean> //= this.auth.isRouteAuthenticated()
  registrForm = true;
  formGroup!: FormGroup;

  username = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  repeatPassword =new FormControl("", [Validators.required]);
  
  errorMessage: string = ""

  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.initForm()
    // if (this.tokenStorage.getToken()) {
    // this.auth.setIsAuthenticated(true)
    // this.loginForm = false
    // }
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      repeatPassword: new FormControl("", [Validators.required])
    });
  }

  // allowRouteAccess(access: boolean):void{
  //   this.auth.setIsAuthenticated(access);
  //   this.auth.isRouteAuthenticated();
  // }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.email.hasError('required')){
      return 'You must enter a value';
    }
    else if(this.email.hasError('email')){
      return 'Wrong email!';
    }
    else if (this.repeatPassword.hasError('required')) {
      return 'You must enter a value';
    }
    return
  }

  // onSubmit(){
  //   if(this.formGroup.valid) {
  //   this.auth.login(this.formGroup.value).subscribe(
  //     data => {
  //       if (data.IsError === false) {
  //       this.auth.setIsAuthenticated(true)
  //       this.tokenStorage.saveToken(data.Data.token);
  //       this.allowRouteAccess(true)
  //       this.router.navigateByUrl('/home')
  //       } else {
  //         this.errorMessage = data.ErrMsg
          
  //       } 
  //     },
  //   );
  // }
  //   console.log(this.formGroup)
  //   }

}
