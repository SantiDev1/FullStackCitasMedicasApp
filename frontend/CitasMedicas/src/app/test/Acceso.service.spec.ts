import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
;
import { AccesoService } from '../services/acceso.service';
import { Register } from '../interface/Register';
import { ResponseAcceso } from '../interface/ResponseAcesso';
import { Login } from '../interface/Login';
import { appsettings } from '../settings/appsettings';

// esta sesion es de testings

describe('AccesoService', () => {
  let service: AccesoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccesoService]
    });
    service = TestBed.inject(AccesoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Debe de Crear', () => {
    expect(service).toBeTruthy();
  });

  it('Deebe de registrar  un usuario', () => {
    const mockRegister: Register = { email: 'test@example.com', password: 'password123' };
    const mockResponse: ResponseAcceso = {
        success: true,
        tokenType: '',
        accessToken: ''
    };

    service.registrarse(mockRegister).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${appsettings.apiUrl}/identity/register`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('Debe de hacer Login', () => {
    const mockLogin: Login = { email: 'test@example.com', password: 'password123' };
    const mockResponse: ResponseAcceso = {
        success: true,
        tokenType: '',
        accessToken: ''
    };

    service.login(mockLogin).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${appsettings.apiUrl}/identity/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('Debe de crear una cita', () => {
    const mockData = { fecha: '2024-06-25', hora: '10:00', motivo: 'Consulta' };
    const mockResponse = { success: true, message: 'Cita creada correctamente' };

    service.createCita(mockData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${appsettings.apiUrl}/api/Citas`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });
});
