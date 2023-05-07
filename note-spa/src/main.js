import { createApp } from 'vue';
import App from './App.vue'
import './assets/css/main.css';
//import './registerServiceWorker.js'
import router from './router'
import { initializeApp } from "firebase/app";
import { h } from 'vue';
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

  // Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//const analytics = getAnalytics(app);


const firebaseConfig = {
    apiKey: "AIzaSyDAO52QJhe1lp7aAwhkbM5ql0GjChSM0uE",
    authDomain: "note-spa.firebaseapp.com",
    projectId: "note-spa",
    storageBucket: "note-spa.appspot.com",
    messagingSenderId: "1026425064524",
    appId: "1:1026425064524:web:3a55da9513789ff6e8b8e9"
  };
const firebase_app = initializeApp(firebaseConfig);

export const db = getFirestore(firebase_app)
export const auth = getAuth()
export const storage = getStorage(firebase_app)


initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const app = createApp({
  render: ()=>h(App),
  methods: {
    testujemy() {
      console.log("testy");
    }
  }

});
app.use(router)
app.mount('#app')



// export function getNotes(){
//   getDocs(collection(db, "test-notes-collection")).then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data().Title}`);
//     })}
//   );
// } 

