
  <script>
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../main.js";
  
  export default {
    data() {
      return {
        title: null,
        content: null,
      };
    },
    async mounted() {
      const id = this.$route.params.id;
      console.log(id)
      //user id just for testing
      const querySnapshot = doc(db, "users", "mFqJBkr7DiWUbXqd2RdRKdGoMQk1","notes", id);
      const note = await getDoc(querySnapshot);
      
      if (!note) {
        console.log("No such note");
        return;
      }
      
      if (note.sharedWith && !note.sharedWith.includes(this.$store.state.user.uid)) {
        console.log("Note not shared with user");
        return;
      }

      console.log(note.title)
      console.log(note)
  
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
  