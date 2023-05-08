<script>
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../main.js";
import {getAuth} from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";


export default {
    data() {
        return {
            notesList: [],
            text_notes: [],
        }
    },
    async mounted() {
        console.log("show notes")
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

            console.log("noteData:")
            console.log(noteData)

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

            console.log("first20 split result" + result)
            return result
        },
    }
}
</script>

<template>
    <div class="mx-auto">
        <div class="container-flex" v-if="text_notes">
            <TransitionGroup name="list">
                <div class="card mb-1" v-for="note in text_notes" :key="note.Title">
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
