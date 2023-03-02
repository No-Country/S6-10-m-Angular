import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../modules/auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {

  realRol: string="";

  constructor(private tokenService: TokenService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRol = route.data['expectedRol'];
      const ROL = this.tokenService.getRole();
      this.realRol = 'visited';
      if (ROL=='patient') {
        return true;                 
      } else {
        this.tokenService.logOut();
        this.router.navigate(['/']);
        return false;
      }      
  }
  
}
