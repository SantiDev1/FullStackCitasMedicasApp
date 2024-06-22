import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
// esta valida si el usuario tiene el token si no lo tiene no lo deja acceder a las otras  vistas como inicio etc...

  const token = localStorage.getItem("token") || "";
  const router = inject(Router);

  if(token != ""){
    return true
  }else {
    const url = router.createUrlTree([""])
    return url;
  
  }
 
};
