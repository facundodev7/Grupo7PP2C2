// Modelos 
export class Animal{
    id?:number;
    Nombre:string;
    Animal:string;
    Domicilio:string;
    Telefono:number;
    PrimeraVez:string;
    Motivo:string;
    fechaCreacion:Date;
    fechaActulizacion:Date;


    constructor(Nombre:string,Animal:string,Domicilio:string,Telefono:number,PrimeraVez:string,Motivo:string){
        this.Nombre=Nombre;
        this.Animal=Animal;
        this.Domicilio=Domicilio;
        this.Telefono=Telefono;
        this.PrimeraVez=PrimeraVez;
        this.Motivo=Motivo;
        this.fechaCreacion=new Date();
        this.fechaActulizacion=new Date();
    }
}