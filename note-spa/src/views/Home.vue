<script>
import {getAuth} from "firebase/auth";
import ListNotes from '../components/ListNotes.vue'


export default {
    components: {
        ListNotes
    },
    methods: {
        createTextNote: function () {
            const auth = getAuth();
            console.log(auth.currentUser.uid);
            addDoc(collection(db, `users/${auth.uid}/notes`), {
                Title: 'new',
                Content: "do testu v2"                
            });
        }
    }
}
</script>

<template>
    <div class="container-fluid">
        <p>Test home screen</p>

        <ListNotes />

        <router-link class="nav-link" to="add-note" active-class="active">
            <button class="btn btn-primary mt-3">Dodaj notatkę</button>
        </router-link>
        
    </div>
</template>

