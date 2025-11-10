// Modelos 
export class Articulo{
    Titulo:string;
    Texto:string;
    Imagen:string;
    fechaCreacion:Date;
    fechaActulizacion:Date;


    constructor(Titulo:string,Texto:string,Imagen:string){
        this.Titulo=Titulo;
        this.Texto=Texto;
        this.Imagen=Imagen;
        this.fechaCreacion=new Date();
        this.fechaActulizacion=new Date();
    }
}