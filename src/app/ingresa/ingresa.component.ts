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

  tipo:string = ''
  perro:boolean = false
  gato:boolean = false
  nombre:any
  edad:any
  raza:any
  motivo:any
  constructor(private controlador:ControladorR){}
  }

