// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
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

export class ControladorR {
  constructor(private ruta:Router){}

async login(arg1:any,arg2:any){

    try{
      const userCredential = await signInWithEmailAndPassword(auth, arg1, arg2)

      const uid = userCredential.user?.uid;

      if (uid){
        this.writeUserId(uid);
        currentUserId = uid
      }

      this.ruta.navigate([''])

    }
    catch(error:any){
    }
  }

  writeUserId(userId:any) {
      const db = getDatabase();
      const reference = ref(db, 'users/' + userId);

  update(reference, {
        id: userId
      })
  }
}


  



