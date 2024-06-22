import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // esta funcion intercepta las pesticiones para comprobrar si tiene autorizacion
  if(req.url.indexOf("Acesso") > 0)  return next(req);

  const token = localStorage.getItem("token")
  const clonRequest = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(clonRequest)
};
