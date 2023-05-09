
<script>

import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../main.js";
export default {
  data() {
    return {
      note: null,
      id: this.$route.params.id,
      auth: auth,
      uid: auth.currentUser.uid,
      title: null,
      content: null,
      ImageURL: null,
      rec: null,
    };
  },
  async mounted() {
    const docRef = doc(db, "users", `${this.uid}`, "notes", `${this.id}`);
    const docSnap = await getDoc(docRef);
    const noteDoc = doc(db, `users/${auth.currentUser.uid}/notes`, docRef.id);


    // this.note =  docSnap;

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      this.title = docSnap.data().Title;
      this.content = docSnap.data().Content;
      this.ImageURL = docSnap.data().ImageURL;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    const storageRef = ref(storage, `users/${this.uid}/recordings/${this.id}`);
    getDownloadURL(storageRef).then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = () => {
        const clipContainer = document.createElement("article");
        const blob = xhr.response;
        const soundClips = document.querySelector(".sound-clips");
        soundClips.innerHTML = "";
        const audio = document.createElement("audio");
        audio.controls = true;
        clipContainer.classList.add("clip");
        audio.setAttribute("controls", "");
        clipContainer.appendChild(audio);
        soundClips.appendChild(clipContainer);
        const audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;
      };
      xhr.open("GET", url);
      xhr.send();
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    deleteNote: function(){      
      console.log("id auth to "+ auth.currentUser.uid);
      console.log("id to " + this.id)
      deleteDoc(doc(db, `users/${this.uid}/notes/${this.id}`)).then(() => {
        this.$router.push('/home');
      })
    },
    shareNote: function(){ 
        this.$router.push(`/share/${this.id}`);
        }
  },
};
</script>
 
<template>

  <div class="container">       
      <button @click.prevent="deleteNote" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
        <img style="width: 30px" src = "../assets/trash-bin.svg"/>
      </button>
      <button @click="shareNote" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">

        <img style="width: 30px" src = "../assets/share.svg"/>
      </button>
        <div class="card mb-1">
      <div class="card-body" style="text-align: justify;text-justify: inter-word;">
        <h5 class="card-title">{{ title }}</h5>
        <img :src="ImageURL" alt="image" />
        <p class="card-text" style="color:grey;">
          {{content}}
        </p>
      </div>
    </div>
    <h1>{{id}}</h1>
    <section class="main-controls">
      <div id="buttons"></div>
    </section>
    <button @click.prevent="deleteRecording" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
      <img style="width: 30px" src="../assets/trash-bin.svg" />
    </button>

    <section class="sound-clips"></section>
  </div>
</template>