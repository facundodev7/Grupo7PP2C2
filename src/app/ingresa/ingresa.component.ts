import { Component } from '@angular/core';
import { ControladorR } from '../../database';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingresa',
  imports: [FormsModule],
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

  setAnimalPerro(){
    if(this.perro == false){
      this.perro = true
      this.gato = false
      this.tipo = 'Perro'
    console.log('perro ', this.perro, 'gato ', this.gato)
  }
}

  setAnimalGato(){
    if(this.gato == false){
      this.gato = true
      this.perro = false
      this.tipo = 'Gato'
    console.log('perro ', this.perro, 'gato ', this.gato)
  }
  }

  subir(){
    this.controlador.agregarMascota(this.controlador.getCurrentUid(), this.tipo, this.nombre, this.edad, this.raza, this.motivo)
  }

}
