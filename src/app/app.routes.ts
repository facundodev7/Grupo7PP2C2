import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { ContactoComponent } from './contacto/contacto.component';
import { IngresaComponent } from './ingresa/ingresa.component';
import { TurnoComponent } from './turno/turno.component';
import { RegistroComponent } from './registro/registro.component';

const routeConfig: Routes = [
  {
    path: '',
    component: InicioComponent,
    title: 'Patitas Felices'
  },
  {
    path:'login',
    component:LoginComponent,
    title:'Iniciar Sesion'
  },
  {
    path:'regis',
    component:RegistroComponent,
    title:'Registrarse'
  },
  {
    path:'quienes',
    component:QuienesSomosComponent,
    title:'Quienes Somos'
  },
  {
    path:'contacto',
    component:ContactoComponent,
    title:'Contacto'
  },
  {
    path:'ingresarM',
    component:IngresaComponent,
    title:'Ingresa tu Mascota'
  },
  {
    path:'turno',
    component:TurnoComponent,
    title:'Saca un turno'
  }
];

export default routeConfig
