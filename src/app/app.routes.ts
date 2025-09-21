import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

const routeConfig: Routes = [
  {
    path: '',
    component: InicioComponent,
    title: 'Patitas Felices'
  },
  {
    path:'quienes',
    component:QuienesSomosComponent,
    title:'Quienes Somos'
  },
  {
    path:'login',
    component:LoginComponent,
    title:'Iniciar Sesion'
  }
];

export default routeConfig
