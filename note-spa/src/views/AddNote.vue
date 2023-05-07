<template>
    <div class ='container'>
        <p>Enter your note</p>
        <form class = 'row mb-3'>
            <input style="width: 90%%; height: 5vh" class="form-control row mb-3" v-model="noteTitle" type="text" placeholder="Title" required>
            <br>
            <textarea style="width: 100%; height: 200px" v-model="noteContent" class="row mb-3 noteContent form-control" placeholder="Text" required>
            </textarea>

            <br>
            <label class="btn btn-add-photo">
                <i class="bi bi-camera"></i> Add photo<input @change="checkIfPhotoUploaded()"
                    onchange="document.getElementById('photo').src = window.URL.createObjectURL(this.files[0])"
                    type="file" style="display: none;" id="photo-upload" name="image" accept="image/*">
            </label>
            <div v-if="photoUploaded">
                <img class="img-fluid img-thumbnail" id="photo" />
            </div>

            <br>            
            <button @click.prevent="addNote" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
            <img style="width: 30px" src = "../assets/save-icon.svg"/>
            </button>
        </form>
        
    </div>
</template>
<script>
import {getAuth} from "firebase/auth";
import {db} from "../main.js";
import {addDoc, collection} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "vue-router";

export default {
    data() {
        return {
            photoUploaded: false
        }
    },
    methods: {
        checkIfPhotoUploaded() {
            this.photoUploaded = document.getElementById("photo-upload").files.length != 0
        },
        addNote() {
            if (this.noteTitle.length > 0 && this.noteContent.length > 0) {
                const auth = getAuth();
                console.log(auth.currentUser.uid);
                var dateOfCreation = new Date();
                console.log(dateOfCreation)
                const noteRef = collection(db, `users/${auth.currentUser.uid}/notes`);
                addDoc(noteRef, {
                    Title: this.noteTitle,
                    Content: this.noteContent,
                    Date: dateOfCreation                     
                }).then((docRef) => {
                    if (this.photoUploaded) {
                        const storage = getStorage();
                        const file = document.getElementById("photo-upload").files[0];
                        const fileRef = ref(storage, `users/${auth.currentUser.uid}/notes/${docRef.id}/${file.name}`);
                        uploadBytes(fileRef, file).then(() => {
                            console.log('Uploaded a blob or file!');
                            this.$router.push('/home');
                        });
                    } else {
                        this.$router.push('/home');
                    }
                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });                             
            }
        }
    }
}
</script>
