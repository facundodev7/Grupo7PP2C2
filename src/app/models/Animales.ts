// Modelos 
export class Animal{
    id?:number;
    Nombre:string;
    Animal:string;
    fechaCreacion:Date;
    fechaActulizacion:Date;


    constructor(Nombre:string,Animal:string){
        this.Nombre=Nombre;
        this.Animal=Animal;
        this.fechaCreacion=new Date();
        this.fechaActulizacion=new Date();
    }
}