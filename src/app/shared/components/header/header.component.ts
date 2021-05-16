import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  readonly isLoggedIn$:Observable<boolean>

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigateByUrl('/login')
  }

  logout(): void {
  }

  blockAccess(): void {
    
  }

  registr(){
    this.router.navigateByUrl('/registr')
  }

}
