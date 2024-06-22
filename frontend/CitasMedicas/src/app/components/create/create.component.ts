import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccesoService } from '../../services/acceso.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  firstFormGroup = this._formBuilder.group({
    tipodedocumento: ['', Validators.required],
    numerodedocumento: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    telefonofijo: ['', Validators.required],
    celular: ['', Validators.required],
    departamento: ['', Validators.required],
    ciudad: ['', Validators.required],
    regional: ['', Validators.required],
    oficina: ['', Validators.required],
    tramite: ['', Validators.required],
    calendario: ['', Validators.required], 
    hora: ['', Validators.required], 
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _service: AccesoService,
    private _router: Router
  ) {}

      // Esta funcion es para crear la cita
  agendarCita() {
    if (!this.firstFormGroup.valid || !this.secondFormGroup.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Faltan campos por llenar en el formulario.',
      });
      return;
    }

    const fechaSeleccionada = this.secondFormGroup.get('calendario')?.value;
    const horaSeleccionada = this.secondFormGroup.get('hora')?.value;

    // Formatear la fecha y la hora en formato ISO 8601: "yyyy-mm-ddThh:mm:ss"
    let calendario = '';
    if (fechaSeleccionada && horaSeleccionada) {
      const fecha = new Date(fechaSeleccionada);
      fecha.setHours(parseInt(horaSeleccionada.split(':')[0], 10));
      fecha.setMinutes(parseInt(horaSeleccionada.split(':')[1], 10));
    
      calendario = fecha.toISOString();
    }
    
  
    const citaData = {
      tipodocumento: this.firstFormGroup.get('tipodedocumento')?.value || '',
      numeroDocumento: this.firstFormGroup.get('numerodedocumento')?.value || '',
      nombres: this.secondFormGroup.get('nombres')?.value || '',
      apellidos: this.secondFormGroup.get('apellidos')?.value || '',
      fijo: this.secondFormGroup.get('telefonofijo')?.value || '',
      celular: this.secondFormGroup.get('celular')?.value || '',
      departamento: this.secondFormGroup.get('departamento')?.value || '',
      ciudad: this.secondFormGroup.get('ciudad')?.value || '',
      regional: this.secondFormGroup.get('regional')?.value || '',
      oficina: this.secondFormGroup.get('oficina')?.value || '',
      tramite: this.secondFormGroup.get('tramite')?.value || '',
      calendario: calendario, // Envía la fecha y hora combinadas al servicio
    };

    

    // Llama al servicio para agendar la cita
    this._service.createCita(citaData).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cita Agendada Correctamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this._router.navigate(['inicio/dashboard']);
        console.log('Cita agendada correctamente', response);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al agendar la cita. Inténtalo nuevamente más tarde.',
        });
        console.error('Error al agendar la cita', error);
      }
    );
  }
}
