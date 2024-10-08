import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegistrarseComponent } from '../registrarse/registrarse.component';

@Component({
  selector: 'app-inicio-no-registrado',
  templateUrl: './inicio-no-registrado.component.html',
  styleUrls: ['./inicio-no-registrado.component.css']
})
export class InicioNoRegistradoComponent {

constructor(private router:Router, private dialog: MatDialog){}


inicioSesion(): void {
  const dialogRef = this.dialog.open(LoginComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo se cerró');
  });
}

registrarse():void{
  const dialogRef = this.dialog.open(RegistrarseComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo se cerró');
  });
}
}
