import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  showWelcomeMessage = false;

  constructor(private router: Router) {}
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
    // esta parte sirve para cargar el html de bienvenido
    ngOnInit() {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(event => {
        const navEndEvent = event as NavigationEnd;
        this.showWelcomeMessage = navEndEvent.urlAfterRedirects === '/inicio';
      });
    }

    // esta parte es el log out donde  el usuario cierra la sesion elimina el token y  el routeer lo dirije  al login
    logout() {
      localStorage.removeItem('token');
  
      Swal.fire({
        icon: 'success',
        title: '¡Has cerrado sesión correctamente!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['']);
      });
    }
      
}
