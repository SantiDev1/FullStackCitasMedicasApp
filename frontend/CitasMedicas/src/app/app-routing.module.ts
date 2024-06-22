import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { authGuard } from './custom/auth.guard';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';



const routes: Routes = [
  { path: '', component: LoginComponent, },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: NavigationComponent, canActivate: [authGuard] , children : [
    { path: 'dashboard', component: DashboardComponent},
    { path : 'create', component : CreateComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
