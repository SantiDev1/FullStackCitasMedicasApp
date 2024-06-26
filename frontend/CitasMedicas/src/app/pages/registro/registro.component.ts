import { Component } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  email: string = '';
  password: string = '';

  // manejo de errores que retorna la api
  errores: { [key: string]: string } = {
    PasswordTooShort: "Las contraseñas deben tener al menos 6 caracteres.",
    PasswordRequiresNonAlphanumeric: "Las contraseñas deben contener al menos un carácter no alfanumérico.",
    PasswordRequiresLower: "Las contraseñas deben contener al menos una letra minúscula ('a'-'z').",
    PasswordRequiresUpper: "Las contraseñas deben contener al menos una letra mayúscula ('A'-'Z').",
    PasswordRequiresSpecial: "Las contraseñas deben contener al menos un carácter especial (por ejemplo, '@' o '*').",
    DuplicateUserName: "El correo electrónico ya está en uso.",
    InvalidEmail: "El correo electrónico ingresado es inválido."  
  };

  constructor(
    private accesoService: AccesoService,
    private router: Router
  ) {}

  // función principal que hace el registro de los usuarios con validaciones
  Registrarse() {
    if (!this.email || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Correo electrónico y contraseña son obligatorios!'
      });
      return;
    }

    // Validaciones de contraseña
    if (this.password.length < 6) {
      this.mostrarError('PasswordTooShort');
      return;
    }
    if (!/\d|\W/.test(this.password)) {
      this.mostrarError('PasswordRequiresNonAlphanumeric');
      return;
    }
    if (!/[a-z]/.test(this.password)) {
      this.mostrarError('PasswordRequiresLower');
      return;
    }
    if (!/[A-Z]/.test(this.password)) {
      this.mostrarError('PasswordRequiresUpper');
      return;
    }
    if (!/[@*]/.test(this.password)) {
      this.mostrarError('PasswordRequiresSpecial');
      return;
    }

    // Si pasa todas las validaciones, proceder con el registro
    const registerData = { email: this.email, password: this.password };

    this.accesoService.registrarse(registerData).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro Exitoso!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        if (error.response && error.response.data && error.response.data.errors) {
          const apiErrors = error.response.data.errors;
          if (apiErrors.InvalidEmail && apiErrors.InvalidEmail[0]) {
            this.mostrarError('InvalidEmail');
          } else if (apiErrors.DuplicateUserName && apiErrors.DuplicateUserName[0]) {
            this.mostrarError('DuplicateUserName');
          }
        } else {
          this.mostrarError('Error desconocido'); // Mensaje de error por defecto
        }
      }
    });
  }

  // sirve para volver al login
  Volver() {
    this.router.navigate(['']);
  }

  // esta función muestra el error dado el caso de que el usuario no ingrese la contraseña con las condiciones
  private mostrarError(tipo: string) {
    let mensaje: string;
    switch (tipo) {
      case 'CampoRequerido':
      case 'PasswordTooShort':
      case 'PasswordRequiresNonAlphanumeric':
      case 'PasswordRequiresLower':
      case 'PasswordRequiresUpper':
      case 'PasswordRequiresSpecial':
      case 'DuplicateUserName':
      case 'InvalidEmail':  // New error type
        mensaje = this.errores[tipo];
        break;
      default:
        mensaje = 'Error desconocido';
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje
    });
  }
}
