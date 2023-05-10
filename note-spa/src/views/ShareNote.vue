
<script>

import { doc, getDoc, deleteDoc } from "firebase/firestore";
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

      var noteId = window.location.pathname;
      noteId = noteId.split('/').pop();
      console.log("this.noteId:")
      console.log(noteId)


      try {
        await navigator.clipboard.writeText(window.location.href.replace("share", "shared"));
        alert('link skopiowano do schowka');
      } catch($e) {
        alert('nie można skopiować');
      }
      
      
      const noteRef = getDoc(doc(db, "notes", noteId));
      await updateDoc(noteRef, { isShared: true });


      
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
    <h5 class="card-text" style="color:gray; align-self: left;">
        Udostępnij innemu użytkownikowi
    </h5> 
    <div>
        <input class="col-sm-4" type="text" placeholder="Enter the email" v-model="email" />
        <button @click.prevent="shareByEmail" style="color: gray; background-color: orange; border-color: transparent" type="submit">
            <div>Udostępnij</div>
        </button>
    </div>

    <hr style="color: orange"/>
    <h5 class="card-text" style="color:gray;">
        Udostępnione linki
    </h5> 
    <div>
        <table>
        <thead>
            <tr>
            <th>Link do notatki</th>
            <th>Usuń</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(note, index) in sharedLinksList" :key="index">
            <td>{{ note.link }}</td>
            <td>
                <button @click.prevent="deleteSharedLink" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
                <img style="width: 30px" src="../assets/trash-bin.svg"/>
                </button>
            </td>
            </tr>
        </tbody>
        </table>
    </div>


    <hr style="color: orange"/>
    <h5 class="card-text" style="color:gray;">
        Udostępnione innym użytkownikom
    </h5> 
    <div>
        <table>
        <thead>
            <tr>
            <th>Email użytkownika</th>
            <th>Usuń</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(note, index) in sharedUsersList" :key="index">
            <td>{{ note.link }}</td>
            <td>
                <button @click.prevent="deleteSharedUser" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
                <img style="width: 30px" src="../assets/trash-bin.svg"/>
                </button>
            </td>
            </tr>
        </tbody>
        </table>
    </div>

    <hr style="color: orange"/>

  </div>
</template>
