import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public isCollapsed = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;
  public isCollapsed5 = true;
  public isCollapsed6 = true;

  constructor() {}

  ngOnInit(): void {
  }

  scrollTo(seccion: string) {
    window.location.hash = '';
    window.location.hash = seccion;
  }

}
