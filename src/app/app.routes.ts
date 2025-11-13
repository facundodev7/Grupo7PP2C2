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
import { AdminComponent } from './admin-admin/admin/admin.component';
import { AdminArticulosComponent } from './admin-admin/admin-articulos/admin-articulos.component';
import { AdminUsuariosComponent } from './admin-admin/admin-usuarios/admin-usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioEditarComponent } from './usuario/usuario-editar/usuario-editar.component';

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
  {
    path:'usuario',
    component:UsuarioComponent,
    title:'Datos de usuario',
    canActivate: [AuthGuard]
  },
  {
    path:'usuario-editar',
    component:UsuarioEditarComponent,
    title:'Editar datos de usuario',
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
