import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Animal } from '../models/Animales';
import { ControladorR } from '../../database';

@Component({
  selector: 'app-ingresa',
  imports: [ReactiveFormsModule,RouterModule, FormsModule],
  templateUrl: './ingresa.component.html',
  styleUrl: './ingresa.component.css'
})
export class IngresaComponent {


  animal = new Animal('','','',0,'','')

  constructor(private controlador:ControladorR){
  }

  enviar(){
    this.controlador.agregarMascota(this.controlador.getCurrentUid(), this.animal.Nombre, this.animal.Animal, this.animal.Domicilio, this.animal.Telefono, this.animal.PrimeraVez, this.animal.Motivo)
    }
  }

