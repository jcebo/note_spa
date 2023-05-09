
  <script>
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../main.js";
  import { useRouter } from "vue-router";

  
  export default {
    data() {
      return {
        note: null,
        title: "",
        content: "",
        ImageURL: null,
        noteId: this.$route.params.id,
        userOfNoteId: this.$route.params.userid                
      };
    },
    async mounted() {           
      //const id = this.$route.params.id;
      // const querySnapshot = await getDoc(doc(db, "notes", id));
      // const note = querySnapshot.data();
           
      // if (!note) {        
      //   console.log("No such note");
      //   console.log(this.$route.params.userid + 'to route')
        
      //   return;
      // }
      
      // if (note.sharedWith && !note.sharedWith.includes(this.$store.state.user.uid)) {
      //   console.log("Note not shared with user");
      //   return;
      // }

      const docRef = doc(db, "users", `${this.userOfNoteId}`, "notes", `${this.noteId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap){
        console.log("Document data:", docSnap.data());

        this.title = docSnap.data().Title;
        this.content = docSnap.data().Content;
        this.ImageURL = docSnap.data().ImageURL;
      } else {
        console.log("No such document!");
      }; 
      console.log(docSnap + "to docsnap")
  
      this.title = note.title;
      this.content = note.content;
    },
  };
  </script>

  
  <template>
    <div class="container"> 
      <h1 class="card-title" style="color:orange">Udostępniona notatka</h1>      
      <div class="card mb-1">
        <div class="card-body" style="text-align: justify;text-justify: inter-word;">
          <h5 class="card-title">{{ title }}</h5>          
          <p class="card-text" style="color:grey;">
            {{ content }}
          </p>
          <img v-if="ImageURL" :src="ImageURL" alt="image" style="max-width: 50%"/>
        </div>
      </div>
    </div>
  </template>
  