<script>
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../main.js";
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      notesList: [],
      text_notes: [],
      showImages: true,
      showText: true,
      showRecordings: true,
    };
  },
  async mounted() {
    console.log("show notes");
    const auth = getAuth();


        const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser.uid}/notes`));
        
        querySnapshot.forEach(async (doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            const noteData = doc.data();
            noteData.noteId = doc.id;
            if (noteData.ImageURL) {
              const storageRef = ref(getStorage(), noteData.ImageURL);
              const imageURL = await getDownloadURL(storageRef);
              noteData.ImageURL = imageURL;
            }
            this.text_notes.push(noteData);



        });
        console.log("end of showing notes")
    },
    methods: {
        first20: function (string) {
            let split_string = string.split(' ');
            let result = split_string.slice(0, 20).join(' ')
            if (split_string.length > 20) {
                result = result + ' ...'
            }

    this.displayedNotes = this.text_notes;
  },
  methods: {
    first20: function (string) {
      let split_string = string.split(" ");
      let result = split_string.slice(0, 20).join(" ");
      if (split_string.length > 20) {
        result = result + " ...";
      }

      console.log("first20 split result" + result);
      return result;
    },
  },
  computed: {
    filteredNotes() {
      return this.text_notes.filter((note) => {
        return (
          (note.ImageURL && this.showImages) ||
          (!note.ImageURL && this.showText) ||
          (note.RecordingURL && this.showRecordings)
        );
      });
    },
  },
};
</script>



<template>
    <div class="mx-auto">
        <div class="container-flex">
            <div class="d-flex justify-content-end mb-2">
            <button class="btn btn-primary me-2" @click="showImages = !showImages">
            {{ showImages ? "Ukryj notatki z obrazkami" : "Pokaż notatki z obrazkami" }}
            </button>
            <button class="btn btn-primary me-2" @click="showText = !showText">
            {{ showText ? "Ukryj notatki z tekstem" : "Pokaż notatki z tekstem" }}
            </button>
            <button class="btn btn-primary" @click="showRecordings = !showRecordings">
            {{ showRecordings ? "Ukryj notatki z nagraniami" : "Pokaż notatki z nagraniami" }}
            </button>
        </div>
            <TransitionGroup name="list">

                <div class="card mb-1" v-for="note in filteredNotes" :key="note.Title">
                    <router-link :to="'/notes/' + note.noteId">
                        <div class="card-body" style="text-align: justify;text-justify: inter-word;">
                            <h5 class="card-title">{{ note.Title }}</h5>
                            <img v-if="note.ImageURL" :src="note.ImageURL" alt="Note Image">
                            <p style="color:grey;" class="card-text">{{ first20(note.Content)}}</p>
                        </div>
                    </router-link>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>