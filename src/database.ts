// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, update, get, child } from "firebase/database";
import {ref as refStorage, getStorage, uploadString, getDownloadURL} from "firebase/storage"
import { Route, Router } from "@angular/router";
import { Injectable } from "@angular/core";



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

const auth = getAuth();

export var currentUserId:any

@Injectable({
  providedIn:'root'
})

//export class ControladorR {
  //constructor(private ruta:Router){}
//}

export class ControladorR {
  usuarioLogueado: boolean = false;
  correoUsuario: string | null = null;

  constructor(private ruta:Router){

    //aca se sabe si esta logueado o no
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.usuarioLogueado = true;
        this.correoUsuario = user.email;
      } else {
        this.usuarioLogueado = false;
        this.correoUsuario = null;

      // Redirigir a login si intenta entrar a páginas privadas
      this.ruta.navigate(["/login"]);
      }
    });
  }
// --------------------------------------------------------
// esto es para poder cerrar sesión
// 
  async logout() {
  const auth = getAuth();
  await signOut(auth);

  this.correoUsuario = null;
  this.usuarioLogueado = false;

  this.ruta.navigate(["/"]);
}


//---------------------------------------------------------------
  // Registrarse
  async registroUsuario(nombre: string, apellido: string, email: string, telefono: string, password: string) {
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
      const userCredential = await signInWithEmailAndPassword(auth, arg1, arg2)

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
      const db = getDatabase();
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
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    update(reference, {
      correo:email
    })
  }

  writeTelefono(userId:any, telefono:any){
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    update(reference, {
      telefono:telefono
    })
  }


  
  async getEmail(userId:any){
    const db = getDatabase();
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
}