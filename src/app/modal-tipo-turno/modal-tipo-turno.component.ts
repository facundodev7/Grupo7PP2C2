import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-tipo-turno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-tipo-turno.component.html', // referencia al HTML
  styleUrls: ['./modal-tipo-turno.component.css']
})
export class ModalTipoTurnoComponent {
  tipoTurno: string = 'Primera consulta';
  mascota: string = 'Sin definir';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalTipoTurnoComponent>
  ) {}

  confirmar() {
    console.log('Fecha completa:', this.data.fecha);
    console.log('Tipo de turno:', this.tipoTurno);
    console.log('Mascota:', this.mascota);
    this.dialogRef.close();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
