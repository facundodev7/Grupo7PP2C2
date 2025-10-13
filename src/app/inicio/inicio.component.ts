import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { getAuth, signOut, onAuthStateChanged  } from "firebase/auth";
import { ControladorR } from '../../database';
import { currentUserId } from '../../database';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {

  user$!: Observable<any>;
  correo:any
  rol: any;
  admin: boolean = false;

  constructor(private ruta:Router, private controlador:ControladorR)
  {
    this.user$ = this.controlador.user$;
  }

  async cargar(){
    this.correo = await this.controlador.getEmail(await this.controlador.getCurrentUid())
  }

  irA(arg:string){
    this.ruta.navigate([arg])
  }

  out(){
    this.controlador.singOut()
  }

  async ngOnInit(){
    this.controlador.user$.subscribe(async (user) =>{
      if (user){
        this.correo = await this.controlador.getEmail(user.uid)
        this.rol = await this.controlador.getRol(user.uid);
        this.admin = this.rol == 1;
      } else {
        this.correo = null;
        this.rol = null;
        this.admin = false;
      }

      if(this.rol == 5)
      {
         
      }
    })
  }

}
