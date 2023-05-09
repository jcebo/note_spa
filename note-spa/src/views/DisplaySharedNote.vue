
  <script>
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../main.js";
  
  export default {
    data() {
      return {
        title: "",
        content: "",
      };
    },
    async mounted() {
      const id = this.$route.params.id;
      const querySnapshot = await getDoc(doc(db, "notes", id));
      const note = querySnapshot.data();
      
      if (!note) {
        console.log("No such note");
        return;
      }
      
      if (note.sharedWith && !note.sharedWith.includes(this.$store.state.user.uid)) {
        console.log("Note not shared with user");
        return;
      }
  
      this.title = note.title;
      this.content = note.content;
    },
  };
  </script>

  
  <template>
    <div class="container"> 
      <h1 class="card-title" style="color:orange">Udostępniona notatka:</h1>      
      <div class="card mb-1">
        <div class="card-body" style="text-align: justify;text-justify: inter-word;">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text" style="color:grey;">
            {{ content }}
          </p>
        </div>
      </div>
    </div>
  </template>
  