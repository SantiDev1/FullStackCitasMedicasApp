import { Component } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private accesoService: AccesoService,
    private router: Router
  ) {}

  // esta funcion es para inicar sesion hace el llamado al servicio 

  IniciarSesion() {
    //  valida si el correo y la contraseña estan llenas
    if (!this.email || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Correo electrónico y contraseña son obligatorios!'
      });
      return;
    }

    const loginData = { email: this.email, password: this.password };

    // hace el llamado al servicio del metodo login y si es asi se  dirreciona al login
    this.accesoService.login(loginData).subscribe({
      next: (data) => {
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inicio de sesión Exitoso!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/inicio/dashboard']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Credenciales Incorrectas!'
          });
        }
      },
      error: (error) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales Incorrectas!'
        });
      }
    });
  }

  // va a la ruta de registro para que el usuario se registre
  Registrarse() {
    this.router.navigate(['registro']);
  }
}
