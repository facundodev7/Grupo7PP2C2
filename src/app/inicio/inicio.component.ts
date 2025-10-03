import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { getAuth, signOut, onAuthStateChanged  } from "firebase/auth";
import { ControladorR } from '../../database';
import { currentUserId } from '../../database';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {

  correo:any
  usuarioLogueado: boolean = true;

  constructor(private ruta:Router, private controlador:ControladorR)
  {
    this.cargar()
  }

  async cargar(){
    this.correo = await this.controlador.getEmail(currentUserId)
  }

  irA(arg:string){
    this.ruta.navigate([arg])
  }

  test1(){
    console.log(currentUserId)
  }

  async logout() {
    const auth = getAuth();
    await signOut(auth);
  
    this.correo = null;
    this.usuarioLogueado = false;
  
    this.ruta.navigate(["/"]);
  }

  ngOnInit() {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuario logueado
      this.usuarioLogueado= true;
      this.correo = user.email;
    } else {
      // Usuario NO logueado
      this.usuarioLogueado = false;
      this.correo = null;

      // Redirigir a login si intenta entrar a páginas privadas
      this.ruta.navigate(["/"]);
    }
  });
}

}
