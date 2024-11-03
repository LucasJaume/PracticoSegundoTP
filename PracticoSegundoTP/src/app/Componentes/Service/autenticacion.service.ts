import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private url = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string):Observable<any>{
    return this.http.post(`${this.url}/api/login`, { usuario, password })
  }

  register(apellido: string | null | undefined, nombre: string | null | undefined, fecha_nacimiento: string | null | undefined, password: string | null | undefined, rol: string | null | undefined, email: string | null | undefined, telefono: string | null | undefined, dni: string | null | undefined,):Observable<any>{
    return this.http.post(`${this.url}/api/crearUsuario`, { password, fecha_nacimiento, nombre, apellido, rol, email, telefono, dni })
  }

  obtenerUsuarios(): Observable<any> {
    const token = localStorage.getItem('token'); 
  
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type' : 'application/json' 
    };
  
    return this.http.get(`${this.url}/api/obtenerUsuarios`, { headers });
  }

  actualizarUsuario(id: string, usuarioData: any): Observable<any> {
    const token = localStorage.getItem('token');
  
    const headers = {
        'Authorization': ` ${token}`,
        'Content-type': 'application/json'
    };
  
    return this.http.put(`${this.url}/api/actualizarUsuario/${id}`, usuarioData, { headers });
  }

  //funciona cheto
  obtenerEspecialidades(): Observable<any>{
    const token = localStorage.getItem('token'); 
  
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type' : 'application/json' 
    };
  
    return this.http.get(`${this.url}/api/obtenerEspecialidades`, { headers });
  }
 


  crearMedicoEspecialidad(data: { id_medico: number; id_especialidad: number }): Observable<any> {
    const token = localStorage.getItem('token');  
    console.log('Token utilizado:', token);
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type': 'application/json' 
    };
    return this.http.post(`${this.url}/api/crearMedicoEspecialidad`, data, { headers });
  }

  crearAgenda(data: {hora_entrada: string; hora_salida: string; fecha: string; id_medico: number; id_especialidad: number}){
    const token = localStorage.getItem('token');  
    console.log('Token utilizado:', token);
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type': 'application/json' 
    };
    return this.http.post(`${this.url}/api/crearAgenda`, data, { headers });

  }

  modificarAgenda(id_agenda: number, data: {hora_entrada: string; hora_salida: string; fecha: string; id_medico: number; id_especialidad: number}) {
    const token = localStorage.getItem('token');  
    console.log('Token utilizado:', token);
    const headers = {
      'Authorization': `Bearer ${token}`, // Asegúrate de usar "Bearer" si es necesario
      'Content-type': 'application/json' 
    };
    return this.http.put(`${this.url}/api/modificarAgenda/${id_agenda}`, data, { headers });
}


  obtenerAgenda(id_medico: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: ` ${token}`, 'Content-type': 'application/json' };
    return this.http.get(`${this.url}/api/obtenerAgenda/${id_medico}`, { headers });
  }

  obtenerEspecialidadesPorMedico(id_medico: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type': 'application/json'
    };
    return this.http.get(`${this.url}/api/obtenerEspecialidadesMedico/${id_medico}`, {headers});
  }

  obtenerMedicoPorEspecialidad(idEspecialidad: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type': 'application/json'
    };
    return this.http.get(`${this.url}/api/obtenerMedicoPorEspecialidad/${idEspecialidad}`, {headers});
  }

  asignarTurnoPaciente(data: any){
    const token = localStorage.getItem('token');  
    console.log('Token utilizado:', token);
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type': 'application/json' 
    };
    return this.http.post(`${this.url}/api/asignarTurnoPaciente`, data, { headers });
  }

  obtenerCoberturas(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type': 'application/json'
    };
    return this.http.get<any>(`${this.url}/api/obtenerCoberturas`, { headers }).pipe(
      map(response => response.payload) // Accede al array dentro del objeto de respuesta
    );
  }
  
  

  obtenerTurnosPaciente(id: number): Observable<any>{
    const token = localStorage.getItem('token');  
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type': 'application/json' 
    };
    return this.http.get(`${this.url}/api/obtenerTurnoPaciente/${id}`, {headers});
  }
  
obtenerTurnosMedico(fecha: string, id_medico: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': ` ${token}`,
    'Content-type': 'application/json'
  };
  return this.http.post<any>(`${this.url}/api/obtenerTurnosMedico`, { id_medico, fecha }, { headers });
}
  
  

  obtenerUsuario(id: number): Observable<any>{
    const token = localStorage.getItem('token');  
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type': 'application/json' 
    };
    return this.http.get(`${this.url}/api/obtenerUsuario/${id}`, {headers});
  }

  cancelarTurno(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Asumiendo que necesitas un token para autenticar
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type': 'application/json'
    };

    return this.http.delete(`${this.url}/eliminarTurnoPaciente/${id}`, { headers });
  }

}
