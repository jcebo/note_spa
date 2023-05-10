
<script>

import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
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
      editing: false,
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
      this.ImageURL = docSnap.data().ImageURL;
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
    },
    shareNote: function(){ 
        this.$router.push(`/share/${this.id}`);
        },
    startEditing: function () {
      this.editing = true;
    },
    saveChanges: function () {
      updateDoc(doc(db, `users/${this.uid}/notes/${this.id}`), {
        Title: this.title,
        Content: this.content,
      })
        .then(() => {
          this.editing = false;
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },
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

      <button v-if="!editing" @click="startEditing" style="color: transparent; background-color: transparent; border-color: transparent">
        <img style="width: 30px" src = "../assets/pencil-icon.svg"/>
      </button>
    <button v-if="editing" @click="saveChanges" style="color: transparent; background-color: transparent; border-color: transparent">
      <img style="width: 30px" src = "../assets/save-icon.svg"/>
    </button>


        <div class="card mb-1">
      <div class="card-body" style="text-align: justify;text-justify: inter-word;">
        <h5 class="card-title">
          <input v-if="editing" v-model="title" />
          <span v-else>
            {{ title }}
          </span>
        </h5>        
          <p class="card-text" style="color:grey;">
          <textarea v-if="editing" v-model="content"></textarea>
          <span v-else> 
            {{content}}
          </span>
        </p>
        <img v-if="ImageURL" :src="ImageURL" alt="image" style="max-width: 50%"/>
      </div>
    </div>
  </div>
</template>