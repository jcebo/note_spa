<template>
    <div class ='container'>
        <p>Enter your note</p>
        <form class = 'row mb-3' @submit.prevent="addNote">
            <input style="width: 90%%; height: 5vh" class="form-control row mb-3" v-model="noteTitle" type="text" placeholder="Title" required>
            <br>
            <textarea style="width: 100%; height: 200px" v-model="noteContent" class="row mb-3 noteContent form-control" placeholder="Text" required>
            </textarea>

            <br>
            <label class="btn btn-add-photo">
                <i class="bi bi-camera"></i> Dodaj zdjęcie<input @change="checkIfPhotoUploaded()"
                    onchange="document.getElementById('photo').src = window.URL.createObjectURL(this.files[0])"
                    type="file" style="display: none;" id="photo-upload" name="image" accept="image/*">
            </label>
            <div v-if="photoUploaded">
                <img class="img-fluid img-thumbnail" id="photo" />
            </div>

            <br>            
            <button style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
            <img style="width: 30px" src = "../assets/save-icon.svg"/>
            </button>
        </form>
        
    </div>
</template>
<script>
import {getAuth} from "firebase/auth";
import {db} from "../main.js";
import {addDoc, collection} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
import { nextTick } from 'vue';

export default {
    data() {
        return {
            photoUploaded: false,
            docRef:null
        }
    },
    methods: {
        async checkIfPhotoUploaded() {
            await nextTick();
            this.photoUploaded = document.getElementById("photo-upload").files.length != 0
        },
        async addNote(submitEvent) {
            if (this.noteTitle.length > 0 && this.noteContent.length > 0) {                
                const auth = getAuth();
                console.log(auth.currentUser.uid);
                var dateOfCreation = new Date();
                console.log(dateOfCreation)
                const noteRef = collection(db, `users/${auth.currentUser.uid}/notes`);
                console.log("noteRef to "+noteRef)
                await addDoc(noteRef, {
                    Content: this.noteContent,
                    Date: dateOfCreation,

                    ImageURL:'',
                    Title: this.noteTitle,
                    isShared: false     
                    
                    
                    

                }).then(async(docRef) => {
                    
         

                    if (this.photoUploaded) {                        
                        const file = document.getElementById("photo-upload").files[0];                    
                        const storage = getStorage();
                        console.log("storage to "+storage)                    
                        const fileRef = ref(storage, `gs://note-spa.appspot.com/users/${auth.currentUser.uid}/${file.name}`);                        
                        console.log("fileRef to "+fileRef)
                        await uploadBytes(fileRef, file).then(async() => {
                            console.log('Uploaded a blob or file!');
                             await getDownloadURL(fileRef).then((url) => {
                                console.log(typeof url);
                                console.log(url);
                                const updateObj = {
                                    ImageURL: url
                                };
                                const noteDoc = doc(db, `users/${auth.currentUser.uid}/notes`, docRef.id);
                        updateDoc(noteDoc, updateObj).then(() =>{
                            console.log('Photo URL updated successfully!');
                            this.$router.push('/home');
                                });
                                // updateDoc(noteRef, {ImageURL: url.toString()}).then(() => {
                                //     console.log('Photo URL updated successfully!');
                                //     this.$router.push('/home');
                                // });
                            });

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
