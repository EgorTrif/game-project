import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private webSoket: WebsocketService, private router: Router) {
    
  }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if(this.webSoket.gettingData.body.result === true){
        return true;
      }
      else {
        this.router.navigateByUrl('/login');
      return false;
      }
    }
}
