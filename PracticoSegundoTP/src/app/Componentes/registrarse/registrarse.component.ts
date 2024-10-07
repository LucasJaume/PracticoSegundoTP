import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {
  form=this.fb.group({
    'nombre':['',Validators.required],
    'apellido':['',Validators.required],
    'mail':['',Validators.required],
    'tipo':['',Validators.required],
    'dni':['',Validators.required],
    'fecha':['',Validators.required],
    'contrasena':['',Validators.required]
  })

constructor(private fb:FormBuilder, public dialogRef:MatDialogRef<RegistrarseComponent>){}

close(): void {
  this.dialogRef.close();
}

}

