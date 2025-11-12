import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Animal } from '../models/Animales';
import { ControladorR } from '../../database';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingresa',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './ingresa.component.html',
  styleUrls: ['./ingresa.component.css']
})
export class IngresaComponent {

  animal = new Animal('', '');
  correo: string = '';
  admin: boolean = false;

  constructor(private controlador: ControladorR, private router: Router) {
    console.log('✅ Se cargó ingresa.component.ts correctamente');
  }

  fileName: string | null = null;
  previewUrl: string | null = null;


  onFileSelected(event: any) {
  const file = event.target.files[0];
  console.log('📂 Evento change disparado:', event); // 👈
  if (file) {
    this.fileName = file.name;
    console.log('📸 Archivo seleccionado:', this.fileName);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        this.previewUrl = result; // 👈 forzamos a string
      }
    };

    reader.readAsDataURL(file);
  }
}



  irA(ruta: string) {
    console.log(`➡️ Navegando a ${ruta}`);
    this.router.navigate([`/${ruta}`]);
  }

  out() {
    console.log('🚪 Cerrando sesión...');
    this.correo = '';
    this.admin = false;
    this.router.navigate(['/login']);
  }

  enviar() {
    console.log('📨 Enviando mascota:', this.animal);
    this.controlador.agregarMascota(
      this.controlador.getCurrentUid(),
      this.animal.Nombre,
      this.animal.Animal,
    );
  }
}
