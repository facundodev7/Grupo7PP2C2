  import { Component, Inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { ControladorR } from '../../database';
  import { horaSeleccionada } from '../modal-turno/modal-turno.component';

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
      private dialogRef: MatDialogRef<ModalTipoTurnoComponent>,
      private controlador:ControladorR
    ) {}

  async confirmar() {

    const { fecha } = this.data; // viene del modal anterior

    var fechaCompletaTraidaTodoInsanoMal = fecha.split(' ')

    var anho = fechaCompletaTraidaTodoInsanoMal[2]

    var mes = fechaCompletaTraidaTodoInsanoMal[1]

    var dia = fechaCompletaTraidaTodoInsanoMal[0]

    var hora = fechaCompletaTraidaTodoInsanoMal[3]

    console.log('Const fecha:', fecha)
    console.log('Año: ', fechaCompletaTraidaTodoInsanoMal[2])
    console.log('Mes: ', fechaCompletaTraidaTodoInsanoMal[1])
    console.log('Dia: ', fechaCompletaTraidaTodoInsanoMal[0])
    console.log('Hora: ', fechaCompletaTraidaTodoInsanoMal[3])
    console.log(this.mascota)
    console.log(this.tipoTurno)

    this.controlador.reservarTurno(mes,dia,hora,this.controlador.getCurrentUid())

    this.dialogRef.close();

}


  cerrar() {
    this.dialogRef.close();
  }
}

