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

            <br />
            <div id="buttons">
                <button class="record">Record</button>
                <button class="stop">Stop</button>
            </div>
            <section class="sound-clips"></section>
            <br />

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
            docRef:null,
            voiceUploaded: false,
        }
    },
    async mounted() {
        const router = useRouter()
        const record = document.querySelector(".record");
        const stop = document.querySelector(".stop");
        const soundClips = document.querySelector(".sound-clips");

        // disable stop button while not recording

        stop.disabled = true;

        //main block for doing the audio recording

        if (navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");

        const constraints = { audio: true };
        let chunks = [];

        let onSuccess =  (stream) => {
            const mediaRecorder = new MediaRecorder(stream);

            record.onclick =  () => {
                this.voiceUploaded = true;
                soundClips.innerHTML = "";
                mediaRecorder.start();
                console.log(mediaRecorder.state);
                console.log("recorder started");
                record.style.background = "red";

                stop.disabled = false;
                record.disabled = true;

            };

            stop.onclick =() => {
                
                mediaRecorder.stop();
                console.log(mediaRecorder.state);
                console.log("recorder stopped");
                record.style.background = "";
                record.style.color = "";
                // mediaRecorder.requestData();

                stop.disabled = true;
                record.disabled = false;

                // this.voiceUploaded = true;

                console.log("stop"+ this.voiceUploaded)

            };

            mediaRecorder.onstop = () => {
                console.log("data available after MediaRecorder.stop() called.");

            const clipName = prompt(
                "Enter a name for your sound clip?",
                "My unnamed clip"
            );

            const clipContainer = document.createElement("article");
            const clipLabel = document.createElement("p");
            const audio = document.createElement("audio");
            const deleteButton = document.createElement("button");
            const saveButton = document.createElement("button");

            clipContainer.classList.add("clip");
            audio.setAttribute("controls", "");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete";
            saveButton.textContent = "Save";
            saveButton.className = "save";

            if (clipName === null) {
                clipLabel.textContent = "My unnamed clip";
            } else {
                clipLabel.textContent = clipName;
            }

            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            clipContainer.appendChild(saveButton);
            soundClips.appendChild(clipContainer);

            audio.controls = true;
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            chunks = [];
            console.log("blob  "+blob);
            const audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;
            console.log("recorder stopped");

            deleteButton.onclick = (e)=> {
                let evtTgt = e.target;
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);

                this.voiceUploaded = false;
            };
            saveButton.onclick =  () => {
                
                const storageRef = ref(
                storage,
                `users/${auth.currentUser.uid}/recordings/${clipName}`
                );
                uploadBytes(storageRef, blob).then(() => {
                    console.log('uploaded blob file!');
                })            

            };

            clipLabel.onclick = ()=> {
                const existingName = clipLabel.textContent;
                const newClipName = prompt("Enter a new name for your sound clip?");
                if (newClipName === null) {
                clipLabel.textContent = existingName;
                } else {
                clipLabel.textContent = newClipName;
                }
            };
            };

            mediaRecorder.ondataavailable =  (e) => {
            chunks.push(e.data);
            };
        };

        let onError =  (err) => {
            console.log("The following error occured: " + err);
        };

        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
        } else {
        console.log("getUserMedia not supported on your browser!");
        }
    },


        
    methods: {
        async checkIfPhotoUploaded() {
            await nextTick();
            this.photoUploaded = document.getElementById("photo-upload").files.length != 0
        },
    
        async addNote(submitEvent) {
            console.log("tutaj add notw   "+this.voiceUploaded)
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
                    isShared: false,   
                    VoiceURL:'', 
                    

                    
                    
                    

                }).then(async(docRef) => {
                    console.log("photo   "+this.photoUploaded)


                    if (this.photoUploaded) {   
                        console.log("uruchamia się photoUpload")                     
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

                            });

                        });
                    }

                    if(this.voiceUploaded){
                        console.log("działa?")
   
                        const soundClips = document.querySelector(".sound-clips").blob;
                        const audioElement = soundClips.querySelector("audio");

                        const fileVoice = fetch(audioElement.src).then(response => response.blob());

                        const storage = getStorage();
                        console.log("storage to "+storage)                    
                        const storageRef = ref(storage, `gs://note-spa.appspot.com/users/${auth.currentUser.uid}/${fileVoice.name}`);                        
                        console.log("fileRef to "+storageRef)
                        await uploadBytes(storageRef, fileVoice).then(async() => {
                            console.log('Uploaded a blob or file!');
                             await getDownloadURL(storageRef).then((url) => {
                                console.log(typeof url);
                                console.log(url);
                                const updateObj = {
                                    VoiceURL: url
                                };
                                const noteDoc = doc(db, `users/${auth.currentUser.uid}/notes`, docRef.id);
                        updateDoc(noteDoc, updateObj).then(() =>{
                            console.log('Voice URL updated successfully!');
                            // this.$router.push('/home');
                                });
                            });
                        });

                    }else {
                        console.log(this.voiceUploaded)
                        // this.$router.push('/home');
                    }
                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });                             
            }
        }
    }
}
</script>
