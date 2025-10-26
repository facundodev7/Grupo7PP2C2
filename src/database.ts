// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { getDatabase, ref, update, get, child, set, push } from "firebase/database";
import {ref as refStorage, getStorage, uploadString, getDownloadURL} from "firebase/storage"
import { Route, Router } from "@angular/router";
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
        window.alert('Login exitoso')
        this.ruta.navigate([''])
      }

    }
    catch(error:any){
      window.alert('Login fallido')
    }
  }

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
    window.alert('Mascota subida')
    this.ruta.navigate([''])
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
  
  async reservarTurno(fecha:string, mes:string, userId:string, hora:string){
    const db = getDatabase();

    const fechaKey = fecha.replace(/\//g, '-').replace(/ /g, '_'); // ej: 26-10-2025
    const horaKey = mes.replace(/[: ]/g, '_'); // ej: 9_00_a_9_30_Hs

    const refTurno = ref(db, `turnos/${fechaKey}/${horaKey}`);

    await set(refTurno, {
      fecha,
      mes,
      userId,
      hora,
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
}