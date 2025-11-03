import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog  } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ModalTipoTurnoComponent } from '../modal-tipo-turno/modal-tipo-turno.component';
import { getDatabase, ref, get } from 'firebase/database';
import { ControladorR } from '../../database';



@Component({
  selector: 'app-modal-turno',
  templateUrl: './modal-turno.component.html',
  styleUrls: ['./modal-turno.component.css'],
  imports: [CommonModule],      // <--- necesario para *ngFor, *ngIf
})



export class ModalTurnoComponent {

   async ngOnInit() {
  await this.cargarTurnosOcupados();

  if (this.tieneTurnoAceptado()) {
    alert('Ya tenés un turno reservado para este día.');
  }
}


  turnoSeleccionado: number | null = null;

turnos: {
  hora: string;
  aceptado: boolean;
  usuario?: string;  
}[] = [
  { hora: '09:00 a 9:30 Hs', aceptado: false },
  { hora: '09:30 a 10:00 Hs', aceptado: false },
  { hora: '10:00 a 10:30 Hs', aceptado: false },
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
    private dialog: MatDialog,
    private controlador: ControladorR
  ) {}




  seleccionarTurno(index: number) {
    if (this.turnos[index].aceptado) return;
    this.turnoSeleccionado = index;
  }


  cerrar() {
    this.dialogRef.close();
  }

  abrirTipoTurno() {
  if (this.turnoSeleccionado === null) return;

  const turno = this.turnos[this.turnoSeleccionado];
  const hora = turno.hora.split(' ')[0];
  const fechaCompleta = `${this.data.fecha} ${hora}hs`;
  const fechaTurno = `${this.data.fecha}`;
  const horaTurno = `${hora}`;

  this.dialogRef.close();

  this.dialog.open(ModalTipoTurnoComponent, {
    data: { fecha: fechaCompleta, fechaTurno: fechaTurno, horaTurno: horaTurno },
    width: '40%'
  });
}



async cargarTurnosOcupados() {
  const db = getDatabase();
  const fechaRef = ref(db, `turnos/${this.data.fecha}`);
  const snapshot = await get(fechaRef);
  const uidActual = this.controlador.getCurrentUid(); // usuario actual

  if (snapshot.exists()) {
    const turnosGuardados = snapshot.val();

    for (const key in turnosGuardados) {
      const turnoDB = turnosGuardados[key];
      const horaOcupada = turnoDB.hora.substring(0, 5);
      const index = this.turnos.findIndex(t => t.hora.substring(0, 5) === horaOcupada);

      if (index !== -1) {
        this.turnos[index].aceptado = true;
        this.turnos[index].usuario = turnoDB.usuario || null; // guardar quién lo pidió
      }
    }
  }

  // Si hay algún turno aceptado por el mismo usuario actual
  if (this.turnos.some(t => t.aceptado && t.usuario === uidActual)) {
    alert('Ya tenés un turno reservado para este día.');
  }
}


tieneTurnoAceptado(): boolean {
  const uid = this.controlador.getCurrentUid();
  if (!uid) return false;

  return this.turnos.some(t => t.usuario === uid && t.aceptado);
}





}






