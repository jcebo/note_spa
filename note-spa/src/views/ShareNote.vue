
<script>

import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../main.js";

export default {
  name: 'MyTableComponent',
  data() {
    return {
      sharedLinksList: [
        { link: 'http://127.0.0.1:5173/notes/4akefBAQogZQDeehoQCh' },
        { link: 'http://127.0.0.1:5173/notes/Dw6tOY7FpcFZPYRHfGZY' },
        { link: 'http://127.0.0.1:5173/notes/3J26dgn0mTPnWpWJv04g' },
        { link: 'http://127.0.0.1:5173/notes/yRwqSKelQw7EqZuqkbBp' },
        { link: 'http://127.0.0.1:5173/notes/7vSJQ0Jb98BQ6O9KeVtr' }
      ],
      sharedUsersList: [
        { link: 'aaaaaaaaaaa@gmail.com' },
        { link: 'sssss@gmail.com' },
        { link: 'dddddd@gmail.com' },
        { link: 'eeeeeee@gmail.com' },
      ]
    };
  },
  methods: {
    
    async shareNoteLink() {
      const currentURL = window.location.href
      const noteID = currentURL.slice(-20)
      const updateObj = {isShared: true};
      const noteRef = doc(db, `users/${auth.currentUser.uid}/notes`, noteID);            
      updateDoc(noteRef, updateObj).then(() =>{
        console.log('Changed bool successfully!');
        //this.$router.push('/home');
      });
      const currentHost = window.location.host
      navigator.clipboard.writeText(currentHost+'/sharedNote/'+auth.currentUser.uid+'/'+noteID);
    },
    shareByEmail() {
      // Sharing note by mail logic here
    },
    deleteSharedLink() {
      // Deleting shared note link logic here
    },
    deleteSharedUser() {
      // Deleting shared note for user logic here
    }
    
    
  }
};

</script>
 
<template>
  <div class="container" style="text-align: left;">
    <h3  style="color:orange; text-justify: inter-word;">
        Udostępnij notatkę
    </h3>  
    <button @click.prevent="shareNoteLink" style="color: gray; background-color: orange; border-color: transparent" type="submit">
        <div>Skopiuj link</div>
    </button>

  

    <hr style="color: orange"/>

  </div>
</template>
