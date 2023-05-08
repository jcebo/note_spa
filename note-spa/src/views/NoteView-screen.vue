
<script>

import { auth } from "../main.js";
import { getStorage, ref, deleteObject } from "firebase/storage";
import router from '../router'
export default {
  data() {
    return {
      note: null,
      id: this.$route.params.id,
      auth: auth,
      url: this.$route.params.url
    };
  },
  methods: {
    deleteNote: function(){    
      const storage = getStorage();  
      const fileRef = ref(storage, `users/${auth.currentUser.uid}/photos/${this.id}`);
      deleteObject(fileRef).then(() => {
        console.log('Deleted');
        router.push({ path:"/home" });
      }).catch((error) => {
        alert('There was an error while deleting the file')
        console.log(error)
      });
    }
  }

};
</script>
 
<template>

  <div class="container">
    <button @click.prevent="deleteNote"
      style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
      <img style="width: 30px" src="../assets/trash-bin.svg" />
    </button>
    <div class="card mb-1">
      <div class="card-body" style="text-align: justify;text-justify: inter-word;">
        <h5 class="card-title">{{ id }}</h5>
        <img class="img-thumbnail" v-bind:src="url">
      </div>
    </div>
  </div>
</template>
