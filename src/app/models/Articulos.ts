// Modelos 
export class Articulo{
    Titulo:string;
    Texto:string;
    fechaCreacion:Date;
    fechaActulizacion:Date;


    constructor(Titulo:string,Texto:string,){
        this.Titulo=Titulo;
        this.Texto=Texto;
        this.fechaCreacion=new Date();
        this.fechaActulizacion=new Date();
    }
}