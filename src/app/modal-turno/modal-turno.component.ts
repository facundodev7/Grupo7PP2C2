import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog  } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ModalTipoTurnoComponent } from '../modal-tipo-turno/modal-tipo-turno.component';

@Component({
  selector: 'app-modal-turno',
  templateUrl: './modal-turno.component.html',
  styleUrls: ['./modal-turno.component.css'],
  imports: [CommonModule],      // <--- necesario para *ngFor, *ngIf
})
export class ModalTurnoComponent {

  turnoSeleccionado: number | null = null;

  turnos = [
  { hora: '9:00 a 9:30 Hs', aceptado: false },
  { hora: '9:30 a 10:00 Hs', aceptado: false },
  { hora: '10:00 a 10:30 Hs', aceptado: true }, //para probar
  { hora: '10:30 a 11:00 Hs', aceptado: false },
  { hora: '11:00 a 11:30 Hs', aceptado: false },
  { hora: '11:30 a 12:00 Hs', aceptado: false },
  { hora: '12:00 a 12:30 Hs', aceptado: false },
  { hora: '12:30 a 13:00 Hs', aceptado: false },
  { hora: '13:00 a 13:30 Hs', aceptado: false },
  { hora: '13:30 a 14:00 Hs', aceptado: false },
  { hora: '14:00 a 14:30 Hs', aceptado: false },
  { hora: '14:30 a 15:00 Hs', aceptado: false },
  { hora: '15:00 a 15:30 Hs', aceptado: false },
  { hora: '15:30 a 16:00 Hs', aceptado: false },
  { hora: '16:00 a 16:30 Hs', aceptado: false },
  { hora: '16:30 a 17:00 Hs', aceptado: false },
  { hora: '17:00 a 17:30 Hs', aceptado: false },
  { hora: '17:30 a 18:00 Hs', aceptado: false },
  { hora: '18:00 a 18:30 Hs', aceptado: false }
];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalTurnoComponent>,
    private dialog: MatDialog 
  ) {}

  seleccionarTurno(index: number) {
    this.turnoSeleccionado = index;
    
  }

  // confirmar() {
  //   if (this.turnoSeleccionado !== null) {
  //     const turno = this.turnos[this.turnoSeleccionado];
  //     turno.aceptado = true;

  //     const fecha = this.data.fecha;
  //     const hora = turno.hora.split(' ')[0];
  //     const fechaCompleta = `${fecha} ${hora}hs`;

  //     console.log('Turno confirmado:', fechaCompleta);

  //     this.dialogRef.close();
  //   }
  // }

  cerrar() {
    this.dialogRef.close();
  }

  abrirTipoTurno() {
  if (this.turnoSeleccionado === null) return;

  const turno = this.turnos[this.turnoSeleccionado];
  const hora = turno.hora.split(' ')[0];
  const fechaCompleta = `${this.data.fecha} ${hora}hs`;

  this.dialogRef.close();

  this.dialog.open(ModalTipoTurnoComponent, {
    data: { fecha: fechaCompleta },
    width: '40%'
  });
}




}
