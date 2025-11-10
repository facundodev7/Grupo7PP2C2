// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { getDatabase, ref, update, get, child, set, push, remove } from "firebase/database";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhA5C6gFzR8xV7K4vhcnIBHFV4QsreBfI",
  authDomain: "patitas-6e697.firebaseapp.com",
  projectId: "patitas-6e697",
  storageBucket: "patitas-6e697.firebasestorage.app",
  messagingSenderId: "630971918036",
  appId: "1:630971918036:web:6385159245a6c9df8b7d41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authH = getAuth();

const db = getDatabase();

export var currentUserId:any

@Injectable({
  providedIn:'root'
})

//export class ControladorR {
  //constructor(private ruta:Router){}
//}

export class ControladorR {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  usuarioLogueado: boolean = false;
  correoUsuario: string | null = null;

  constructor(private ruta:Router){
    onAuthStateChanged(authH, (user) => {
      this.userSubject.next(user)
      console.log(user?.uid)
    })
  }
// --------------------------------------------------------
// esto es para poder cerrar sesión
// 
  singOut(){
    authH.signOut()
    
  }

//---------------------------------------------------------------
  // Registrarse
  async registroUsuario(nombre: string, apellido: string, email: string, telefono: string, password: string, rol: any) {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user?.uid;

      if (uid) {
        // Guardar UID 
        this.writeUserId(uid);
        currentUserId = uid;
        // guardar resto de datos
        this.writeEmail(uid, email);
        this.writeNombre(uid,nombre);
        this.writeApellido(uid,apellido);
        this.writeTelefono(uid,telefono);
        this.writeRol(uid,rol);
        
      }

      // redirigir al login o a la página principal
      this.ruta.navigate(['']);
      return { success: true, uid };
    } catch (error: any) { 
      alert('Error al registrarse')
      console.error("Error registrando usuario:", error);
      return { success: false, message: error.message };
    }
  }


//-------------------------------------------------
// iniciar sesión
async login(arg1:any,arg2:any){

    try{
      const userCredential = await signInWithEmailAndPassword(authH, arg1, arg2)

      const uid = userCredential.user?.uid;

      if (uid){
        this.ruta.navigate([''])
      }

    }
    catch(error:any){

      if(!arg1 && !arg2)
      {
        {alert('Ingrese todos los campos')}
      }
      else{
        if (!arg1)
      {alert('Ingrese un usuario')} 
      else if(!arg2)
      {alert('Ingrese una contraseña')}
      else
      {{alert('Error al iniciar sesión')}}
      }
        
    }
  }


  // write -------------------------------------------------------------------------------

  writeUserId(userId:any) {
      const reference = ref(db, 'users/' + userId);

  update(reference, {
        id: userId
      })
  }

  writeNombre(userId:any, nombre:any){
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    update(reference, {
      nombre:nombre
    })
  }

  writeApellido(userId:any, apellido:any){
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    update(reference, {
      apellido:apellido
    })
  }

  writeEmail(userId:any, email:any){
    const reference = ref(db, 'users/' + userId);

    update(reference, {
      correo:email
    })
  }

  writeTelefono(userId:any, telefono:any){
    const reference = ref(db, 'users/' + userId);

    update(reference, {
      telefono:telefono
    })
  }

  writeRol(userId:any, rol:any){
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    update(reference, {
      rol:rol
    })
  }


  agregarMascota(userId:any, arg1?:any, arg2?:any, arg3?:any, arg4?:any, arg5?:any, arg6?:any){
    const refMascota = ref(db, `users/${userId}/mascotas`)
    const nuevaMascota = push(refMascota)

    set(nuevaMascota, {
      nombre:arg1,
      animal:arg2,
      domicilio:arg3,
      telefono:arg4,
      primeraVez:arg5,
      motivo:arg6,
    })
    this.ruta.navigate([''])
  }



//agregar articulo
  agregarArticulo( arg1?:any, arg2?:any, arg3?:any){
    const direccion = ref(db, `articulos`);
    const nuevoArticulo = push(direccion);

    if(arg1 && arg2)
    {
      update(nuevoArticulo, {
      titulo:arg1,
      texto:arg2,
      imagen:arg3,
      fecha:new Date()
    })

    this.ruta.navigate(['']);
    alert('Artículo publicado con exito')

    }
    else
    {
      alert('Ingrese contenido al articulo !')
    }

    
    
  }



  // get -----------------------------------------------------------------------------


  getCurrentUid(){
    return this.userSubject.value?.uid ?? null
  }

  
  async getEmail(userId:any){
    const reference = ref(db, 'users/' + userId);

      try {
        const snapshot = await get(child(reference, `correo`));
          if (snapshot.exists()) {
            return snapshot.val();
          }
          else {
            return null;
          }
      }
    catch (error) {
    return null;
  }
  }

  async getNombre(userId:any){
    const reference = ref(db, 'users/' + userId);

      try {
        const snapshot = await get(child(reference, `nombre`));
          if (snapshot.exists()) {
            return snapshot.val();
          }
          else {
            return null;
          }
      }
    catch (error) {
    return null;
  }
  }

    async getApellido(userId:any){
    const reference = ref(db, 'users/' + userId);

      try {
        const snapshot = await get(child(reference, `apellido`));
          if (snapshot.exists()) {
            return snapshot.val();
          }
          else {
            return null;
          }
      }
    catch (error) {
    return null;
  }
  }

  async getTelefono(userId:any){
    const reference = ref(db, 'users/' + userId);

      try {
        const snapshot = await get(child(reference, `telefono`));
          if (snapshot.exists()) {
            return snapshot.val();
          }
          else {
            return null;
          }
      }
    catch (error) {
    return null;
  }
  }


  // ojo mascotas solo devuelve: id, animal y nombre (los otros campos son innecesarios)
  async getMascotas(userId: any) {
  const reference = ref(db, 'users/' + userId + '/mascotas');

  try {
    const snapshot = await get(reference);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Convertimos el objeto en un array con los campos deseados
      const mascotasArray = Object.entries(data).map(([id, mascota]: [string, any]) => ({
        id,                       
        nombre: mascota.nombre,   
        animal: mascota.animal    
      }));

      console.log(mascotasArray);

      return mascotasArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    return [];
  }
}



async getArticulos() {
  const reference = ref(db, 'articulos');

  try {
    const snapshot = await get(reference);

    if (snapshot.exists()) {
      const data = snapshot.val();

     const articulosArray = Object.entries(data).map(([id, valores]: any) => ({
        id,
        titulo: valores.titulo,
        texto: valores.texto,
        imagen: valores.imagen,
        fecha: valores.fecha
      }));

      //del mas nuevo al mas viejo
      let nuevos = articulosArray.reverse();

        //los últimos 4
        const ultimos = nuevos.slice(-4);

        return ultimos;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error al obtener los articulos:', error);
    return [];
  }
}





  
  async getRol(userId:any){
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

      try {
        const snapshot = await get(child(reference, `rol`));
          if (snapshot.exists()) {
            return snapshot.val();
          }
          else {
            return null;
          }
      }
    catch (error) {
    return null;
  }
  }


  // turnos ---------------------------------------------------------------------------
  
  async reservarTurno(mes:string, fecha:string, hora:string, userId:any){
    const db = getDatabase();

    const fechaKey = fecha.replace(/\//g, '-').replace(/ /g, '_'); // ej: 26-10-2025
    const horaKey = hora.replace(/[: ]/g, '_'); // ej: 9_00_a_9_30_Hs

    const refTurno = ref(db, `turnos/${mes}/${fechaKey}/${horaKey}`);

    await set(refTurno, {
      mes,
      fecha,
      hora,
      userId,
      disponible:false
    });
    console.log(`Turno reservado para ${fecha} ${mes}`);
  }

async obtenerTurnosPorFecha(fecha: string) {
  const db = getDatabase();
  const fechaKey = fecha.replace(/\//g, '-').replace(/ /g, '_');
  const refFecha = ref(db, `turnos/${fechaKey}`);

  const snapshot = await get(refFecha);
  if (snapshot.exists()) {
    return snapshot.val(); // Devuelve un objeto { "9_00_a_9_30_Hs": {fecha, hora, ...}, ... }
  } else {
    return {};
  }
}

async turnosOcupados(fecha: string): Promise<string[]> {
  const db = getDatabase();

  const fechaKey = fecha.replace(/\//g, '-').replace(/ /g, '_');
  const refTurnos = ref(db, `turnos/${fechaKey}`);

  try {
    const snapshot = await get(refTurnos);

    if (snapshot.exists()) {
      const data = snapshot.val();
      // Filtrar los turnos que no están disponibles
      const ocupados = Object.keys(data)
        .filter(horaKey => data[horaKey].disponible === false)
        .map(horaKey => data[horaKey].hora);

      console.log('Turnos ocupados:', ocupados);
      return ocupados;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error obteniendo turnos ocupados:', error);
    return [];
  }
}

async getTurnosAdmin(){
  const db = getDatabase();
  const reference = ref(db, 'turnos');

  try {
    const snapshot = await get(reference);
    const turnos = snapshot.val()
    const listaTurnos: any[] = [];

    Object.keys(turnos).forEach(mes => {
      Object.keys(turnos[mes]).forEach(dia => {
        Object.keys(turnos[mes][dia]).forEach(horaKey => {
          const turno = turnos[mes][dia][horaKey];
          listaTurnos.push({
            mes,
            dia,
            horaKey,
            ...turno
          });
        });
      });
    });

    return listaTurnos
  }
  catch{
    console.log('no agarro')
    return []
  }  

}

async turnosAdminHoy(){
  const db = getDatabase();
  const reference = ref(db, 'turnos');

  var hoy = new Date()

  const diaHoy = hoy.getDate().toString()
  const mesHoy = hoy.toDateString().slice(4, 7); 

  var stringAbuscar = ''

  var turnosHoy: any[] = []

  stringAbuscar = diaHoy + " " + mesHoy
  console.log(stringAbuscar)

  try {
    const snapshot = await get(reference)
    const turnos = snapshot.val()
    
    const buscar = Object.keys(turnos).find(key => {
      const partes = key.split(' ')
      if (partes.length < 2) return false

      const [dia, mesString] = partes
      return(
        dia === diaHoy &&
        mesString.toLowerCase().startsWith(mesHoy.toLowerCase())
      )
    })

    if (buscar){
      const diaTurnos = turnos[buscar]
      Object.keys(diaTurnos).forEach(horaKey => {
        const turno = diaTurnos[horaKey]
        turnosHoy.push({
          fecha:buscar,
          horaKey,
          ...turno
        })
      })
    }
    console.log(turnosHoy)
    return turnosHoy
  }
  catch {
    console.log('se rompio')
    return turnosHoy
  }
}

async turnosAdminManiana(){
  const db = getDatabase();
  const reference = ref(db, 'turnos');

  var maniana = new Date()

  maniana.setDate(maniana.getDate() + 1)

  var manianaMes = maniana.toDateString().slice(4,7)
  var manianaNumero = maniana.getDate().toString()

  var stringAbuscar = ''

  var turnosManiana: any[] = []

  stringAbuscar = manianaNumero + " " + manianaMes
  console.log(stringAbuscar)

  try {
    const snapshot = await get(reference)
    const turnos = snapshot.val()
    
    const buscar = Object.keys(turnos).find(key => {
      const partes = key.split(' ')
      if (partes.length < 2) return false

      const [dia, mesString] = partes
      return(
        dia === manianaNumero &&
        mesString.toLowerCase().startsWith(manianaMes.toLowerCase())
      )
    })

    if (buscar){
      const diaTurnos = turnos[buscar]
      Object.keys(diaTurnos).forEach(horaKey => {
        const turno = diaTurnos[horaKey]
        turnosManiana.push({
          fecha:buscar,
          horaKey,
          ...turno
        })
      })
    }
    return turnosManiana
  }
  catch {
    console.log('se rompio')
    return turnosManiana
  }
}

async turnosAdminAyer(){
  const db = getDatabase()
  const reference = ref(db, 'turnos');
  const snapshot = await get(reference)

  const datos = snapshot.val()
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0);

  const parseDate = (str:string):Date | null => {
    const meses:any = {
       Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5,
      Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11
    };

    const partes = str.split(" ")
    if (partes.length !== 3) return null

    const dia = parseInt(partes[0])
    const mes = meses[partes[1]]
    const anio = parseInt(partes[2])

    if (isNaN(dia) || mes === undefined || isNaN(anio)) return null;
    return new Date(anio, mes, dia);
  }

  const turnosAyer: any[] = []
  const turno = Object.keys(datos).forEach(fechaStr => {
    const fecha = parseDate(fechaStr);
    if (fecha && fecha < hoy) {
      const turnosDia = datos[fechaStr];
      Object.keys(turnosDia).forEach(horaKey => {
        const turno = turnosDia[horaKey];
        turnosAyer.push({
          fecha: fechaStr,
          hora: horaKey,
          ...turno
        });
      });
    }
  });
  console.log(turnosAyer)
  return turnosAyer
}

async turnosAdminFuturo(){
  const db = getDatabase()
  const reference = ref(db, 'turnos');
  const snapshot = await get(reference)

  const datos = snapshot.val()
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0);

  const parseDate = (str:string):Date | null => {
    const meses:any = {
       Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5,
      Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11
    };

    const partes = str.split(" ")
    if (partes.length !== 3) return null

    const dia = parseInt(partes[0])
    const mes = meses[partes[1]]
    const anio = parseInt(partes[2])

    if (isNaN(dia) || mes === undefined || isNaN(anio)) return null;
    return new Date(anio, mes, dia);
  }

  const turnosF: any[] = []
  const turno = Object.keys(datos).forEach(fechaStr => {
    const fecha = parseDate(fechaStr);
    if (fecha && fecha > hoy) {
      const turnosDia = datos[fechaStr];
      Object.keys(turnosDia).forEach(horaKey => {
        const turno = turnosDia[horaKey];
        turnosF.push({
          fecha: fechaStr,
          hora: horaKey,
          ...turno
        });
      });
    }
  });
  console.log(turnosF)
  return turnosF
}

async borrarTurno(fecha:any,hora:any){
  const db = getDatabase()
  const reference = ref(db, `turnos/${fecha}/${hora}`);
  const snapshot = await get(reference)

  const datos = snapshot.val()

  console.log(fecha, hora)
  if (snapshot.exists()){
    await remove(reference)
    console.log(`Turno ${fecha} ${hora} removido`)
  }
  else{
    console.log('No se borro nada')
  }
}

}