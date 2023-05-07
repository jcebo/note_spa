<template>
  <div class="container-fluid align-items-center">
    <div class="row">
      <p class="col-sm">Sign in to NoteApp</p>
      <div class="row justify-content-md-center">
        <input class="col-sm-4" type="text" placeholder="Email" v-model="email" />
      </div>
      <div class="row justify-content-md-center">      
        <input class="col-sm-4" type="password" placeholder="Password" v-model="password" />
      </div>
      <br>
      <div class="row justify-content-md-center">
        <button @click="register" class="button-yellow btn col-sm-4">Sign in</button>
        <br>
      </div>
      <button @click="signInWithGoogle" style="color: transparent; background-color: transparent; border-color: transparent">
        <img style="width: 30px" src = "../assets/google-icon.svg"/>
      </button>      
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <br>
      <br>
      <h5>OR</h5>
      <br>
    
      <router-link class="nav-link" to="register" active-class="active">
        <button class="button-yellow btn">Create an account</button>
      </router-link>
     </div> 
  </div>
</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
const email = ref(""); //https://compiletab.com/vue-get-input-value/#get-input-value-using-ref
const password = ref("");
const router = useRouter();
var errorMessage = ref();
const register = () => {
  const auth = getAuth(); // get auth from firebase/auth
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Succesfully logged in!");
      console.log(auth.currentUser); // <======== thats how u get curr user data
      router.push("/home");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = "Invalid Email";
          break;
        case "auth/wrong-password":
          errorMessage.value = "Invalid Email";
          break;
        case "auth/user-not-found":
          errorMessage.value = "Invalid Email";
          break;
        default:
            errorMessage.value = "Email or password was incorrect";
        
      }
    });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((result)=> {
        console.log(result.user);
        router.push("home");

    })
    .catch((error) =>{
        console.log(error.code)
    })
};

</script>
