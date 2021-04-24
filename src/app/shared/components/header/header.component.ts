import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  readonly isLoggedIn$:Observable<boolean> = this.authService.isRouteAuthenticated()

  constructor(private router: Router,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.authService.setIsAuthenticated(true)
    }
  }

  login(){
    this.router.navigateByUrl('/login')
  }

  logout(): void {
    this.authService.logout()
    this.blockAccess()
  }

  blockAccess(): void {
    this.authService.setIsAuthenticated(false);
    this.authService.isRouteAuthenticated();
  }

  registr(){
    this.router.navigateByUrl('/registr')
  }

}
