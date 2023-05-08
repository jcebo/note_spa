
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
    };
  },
  async mounted() {
    const docRef = doc(db, "users", `${this.uid}`, "notes", `${this.id}`);
    const docSnap = await getDoc(docRef);

    // this.note =  docSnap;

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      this.title = docSnap.data().Title;
      this.content = docSnap.data().Content;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  },
  methods: {
    deleteNote: function(){      
      console.log("id auth to "+ auth.currentUser.uid);
      console.log("id to " + this.id)
      deleteDoc(doc(db, `users/${this.uid}/notes/${this.id}`)).then(() => {
        this.$router.push('/home');
      })
      
    }
  },

};
</script>
 
<template>

  <div class="container">       
      <button @click.prevent="deleteNote" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
        <img style="width: 30px" src = "../assets/trash-bin.svg"/>
      </button>
        <div class="card mb-1">
      <div class="card-body" style="text-align: justify;text-justify: inter-word;">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text" style="color:grey;">
          {{content}}
        </p>
      </div>
    </div>
  </div>
</template>
