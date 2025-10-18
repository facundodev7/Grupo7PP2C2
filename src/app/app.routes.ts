import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { IngresaComponent} from './ingresa/ingresa.component';

const routeConfig: Routes = [
  {path: '',component: InicioComponent,title: 'Patitas Felices'},
  {path:'quienes',component:QuienesSomosComponent,title:'Quienes Somos'},
  {path:'login',component:LoginComponent,title:'Iniciar Sesion'},
  {path:'ingresa',component:IngresaComponent,title:'Ingreso de mascota'},
];

export default routeConfig
