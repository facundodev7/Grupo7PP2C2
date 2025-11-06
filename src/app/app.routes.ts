import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { ContactoComponent } from './contacto/contacto.component';
import { IngresaComponent } from './ingresa/ingresa.component';
import { TurnoComponent } from './turno/turno.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './admin-panel/admin/admin.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminArticulosComponent } from './admin-panel/admin-articulos/admin-articulos.component';
import { AdminUsuariosComponent } from './admin-panel/admin-usuarios/admin-usuarios.component';

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
    title:'Ingresa tu Mascota',
    canActivate: [AuthGuard]
  },
  {
    path:'turno',
    component:TurnoComponent,
    title:'Saca un turno',
    canActivate: [AuthGuard]
  },

  // ------  Admin ------------
  {
    path:'admin',
    component:AdminComponent,
    title:'Administrador',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-panel',
    component:AdminPanelComponent,
    title:'Panel de administrador',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-articulos',
    component:AdminArticulosComponent,
    title:'Articulos (Administrador)',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-usuarios',
    component:AdminUsuariosComponent,
    title:'Usuarios (Administrador)',
    canActivate: [AuthGuard]
  }


];

export default routeConfig
