import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Animal } from '../models/Animales';
@Component({
  selector: 'app-ingresa',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './ingresa.component.html',
  styleUrl: './ingresa.component.css'
})
export class IngresaComponent {

  miFormulario:FormGroup;

  animal!:Animal;

  constructor(private _fb:FormBuilder){
    this.miFormulario = this._fb.group({
      id: 0,
      Nombre: ['', Validators.required],
      animal: ['', Validators.required],
      domicilio: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      primeravez: ['', Validators.required],
      motivo: ['', [Validators.required,Validators.minLength(0),Validators.maxLength(50)]],
    })
  }

  enviar(){
    if(this.miFormulario.valid){
      this.animal={
        id:0,
        Nombre:this.miFormulario.value.nombre,
        Animal:this.miFormulario.value.animal,
        Domicilio:this.miFormulario.value.domicilio,
        Telefono:this.miFormulario.value.telefono,
        PrimeraVez:this.miFormulario.value.primeravez,
        Motivo:this.miFormulario.value.motivo,
        fechaCreacion: new Date(),
        fechaActulizacion: new Date()
      }
    }

  }
}
