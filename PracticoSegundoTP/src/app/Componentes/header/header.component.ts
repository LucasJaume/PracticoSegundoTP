import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private location: Location) {}

  cerrarSesion(): void {
    this.router.navigate(['/home-login']);
  }

  volverAtras() : void{
    this.location.back();
  }
}
