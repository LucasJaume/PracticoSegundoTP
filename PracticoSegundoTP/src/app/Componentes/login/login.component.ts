import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  form=this.fb.group({
    'nombre':['', Validators.required],
    'Contrasena':['',Validators.required]
  })
constructor(private fb:FormBuilder, public dialogRef:MatDialogRef<LoginComponent>, private router:Router){
  
}
aceptar():void{
this.router.navigate(['/home'])
this.dialogRef.close();
}

close(): void {
  this.dialogRef.close();
}

}
