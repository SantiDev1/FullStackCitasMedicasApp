import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AccesoService } from '../../services/acceso.service';
import { Citas } from '../../interface/Citas';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


citas$!: Observable<Citas[]>;
filteredCitas!: Observable<any[]>;
constructor(private service: AccesoService,  private router: Router){

}
// al inicar el app trae las citas y  las filter
ngOnInit() {
  this.citas$ = this.service.getAllCitas(); 
  this.filteredCitas = this.citas$; 
}

// carga las citas una  vez han sido eliminadas lo utilizamos en confirmdelete
cargarCitas() {
  this.citas$ = this.service.getAllCitas(); 
  this.filteredCitas = this.citas$; 
}

// esta funcion hace el llamado al servicio para el delete de la cita

confirmDelete(id: any) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Una vez Cancelada, no podrás recuperar esta cita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, Cancelar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.service.deleteCita(id).subscribe(
        () => {
          Swal.fire(
            'Cancelada!',
            'La cita ha sido Cancelada.',
            'success'
          );
          this.cargarCitas(); 
        },
        error => {
          Swal.fire(
            'Error',
            'Ha ocurrido un error al intentar Cancelada la cita.',
            'error'
          );
        }
      );
    }
  });
}
// esta funcion sirve para  el filtrado  de datos por nombre , appellidos ,ciudad y tramite

applyFilter(filterValue: string) {
  filterValue = filterValue.trim().toLowerCase(); 
  this.filteredCitas = this.citas$.pipe(
    map(citas => citas.filter(cita => 
      cita.nombres.toLowerCase().includes(filterValue) ||
      cita.apellidos.toLowerCase().includes(filterValue) ||
      cita.ciudad.toLowerCase().includes(filterValue) ||
      cita.tramite.toLowerCase().includes(filterValue)
    ))
  );
}

}
