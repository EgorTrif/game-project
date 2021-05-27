import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private websocket: WebsocketService, private router: Router) {
    this.websocket.isUuid()
  }

  uuid$: Observable<String> = this.websocket.isUuid()
  uuid: String

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      this.uuid$.subscribe( data => {
        this.uuid = data
      })
      if(this.uuid != ""){
        return true;
      }
      else {
        this.router.navigateByUrl('/login');
      return false;
      }
    }
}
