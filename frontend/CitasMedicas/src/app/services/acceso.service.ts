import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Register } from '../interface/Register';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../interface/ResponseAcesso';
import { Login } from '../interface/Login';
import { Citas } from '../interface/Citas';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private baseUrl:string = appsettings.apiUrl;

  constructor(private http: HttpClient) { }

  // llamado a la api para registrar un usuario

  registrarse(objeto:Register):Observable<ResponseAcceso>{
    return this.http.post<ResponseAcceso>(`${this.baseUrl}/identity/register`, objeto)
}

  // llamado a la api para login un usuario

login(objeto:Login):Observable<ResponseAcceso>{
  return this.http.post<ResponseAcceso>(`${this.baseUrl}/identity/login`, objeto)

  
}

 // llamado a la api para crear las citas
createCita(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Aquí asumimos que el token está almacenado en localStorage
  });
  return this.http.post(`${this.baseUrl}/api/Citas`, data, {headers});
}

// llamado a la api para obtener todas las citas

getAllCitas(): Observable<Citas[]> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Aquí asumimos que el token está almacenado en localStorage
  });
  return this.http.get<Citas[]>(`${this.baseUrl}/api/Citas`, { headers });
}

// llamado a la api para borrar las citas

deleteCita(id: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Aquí asumimos que el token está almacenado en localStorage
  });
  return this.http.delete(`${this.baseUrl}/api/Citas/${id}`, { headers});
}


}
