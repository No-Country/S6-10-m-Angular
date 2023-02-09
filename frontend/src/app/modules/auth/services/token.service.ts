import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USER_EMAIL_KEY = 'UserEmail';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USERNAME_KEY = 'FirstName';
const LASTNAME_KEY = 'LastName';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  // Token
  public setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string{
    return sessionStorage.getItem(TOKEN_KEY)!;
  }
  // userName / FirstName
  public setUserName(userName:string):void{
    return sessionStorage.setItem(USERNAME_KEY,userName);
  }
  public getUserName(): string{
    return sessionStorage.getItem(USERNAME_KEY)!;
  }
  // LastName
  public setLastName(lastName:string):void{
    return sessionStorage.setItem(LASTNAME_KEY,lastName);
  }
  public getLastName(): string{
    return sessionStorage.getItem(LASTNAME_KEY)!;
  }
  
  // Authorithies
  public setAuthorities(authorities: string[]): void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: { authority: string; }) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  // Logout
  public logOut(): void{
    window.sessionStorage.clear();
  }
}