import{initializeApp } from 'firebase/app'
import{getFirestore} from 'firebase/firestore'
import{getStorage} from'firebase/storage'
import{getAuth} from'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCzLXQqOgwJDvspJoAcO_VkwjP44ZBUA6k",
    authDomain: "luu-proyecto.firebaseapp.com",
    projectId: "luu-proyecto",
    storageBucket: "luu-proyecto.appspot.com",
    messagingSenderId: "688572261389",
    appId: "1:688572261389:web:8027e78f76c711a9e9e144",
    measurementId: "G-FZCFS8Z5YL"
};

  //iniciamos la conexion entre nuestra app y firebase
  const conexion= initializeApp(firebaseConfig)
  //me conecto con el servicio de base de datos firestore
  const db= getFirestore()
  const storage= getStorage(conexion)
  const auth= getAuth()

  export{ db, storage, auth }