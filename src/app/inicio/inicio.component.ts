import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { getAuth, signOut, onAuthStateChanged  } from "firebase/auth";
import { ControladorR } from '../../database';
import { currentUserId } from '../../database';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {

  user$!: Observable<any>;
  correo:any
  rol: any;
  admin: boolean = false;
  articulos: any[] = [];
  mostrarContacto = false; 
  mostrarQuienes = false;
  mostrarMisTurnos = false;

  misTurnos:any[] = [];

  constructor(private ruta:Router, private controlador:ControladorR)
  {
    this.user$ = this.controlador.user$;
  }

  async cargar(){
    this.correo = await this.controlador.getEmail(await this.controlador.getCurrentUid())
  }

  irA(arg: string) {
    // Mostrar el modal de contacto
    if (arg === 'contacto') {
      this.mostrarContacto = true;
      this.mostrarQuienes = false;
      this.mostrarMisTurnos = false;
      return;
    }

    // Mostrar el modal de "quiénes somos"
    if (arg === 'quienes') {
      this.mostrarQuienes = true;
      this.mostrarContacto = false;
      this.mostrarMisTurnos = false;
      return;
    }

    // Mostrar el modal de "mis turnos"
    if (arg === 'mis-turnos') {
      this.mostrarQuienes = false;
      this.mostrarContacto = false;
      this.mostrarMisTurnos = true;
      return;
    }

    // Navegar normalmente
    this.mostrarContacto = false;
    this.mostrarQuienes = false;
    this.mostrarMisTurnos = false;
    this.ruta.navigate([arg]);
  }


  out(){
    this.controlador.singOut()
  }

  async ngOnInit(){
    const uid = this.controlador.getCurrentUid();

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

    //ver articulos

   this.articulos = await this.controlador.getArticulos();

   if (!uid) {
  this.misTurnos = [];
  return; 
    }

   this.misTurnos = await this.controlador.getMisTurnos(uid);


  }





  
}
