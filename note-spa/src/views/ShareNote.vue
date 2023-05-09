
<script>

import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../main.js";

</script>
 
<template>

  <div class="container">
    <h3  style="color:orange; text-justify: inter-word;">
        Share note
    </h3>  
    <button @click.prevent="deleteNote" style="color: gray; background-color: orange; border-color: transparent" type="submit">
        <div>Coppy a link</div>
    </button>

    <hr style="color: orange"/>
    <h5 class="card-text" style="color:gray;">
        Share with other user
    </h5> 
    <div class="row justify-content-md-center">
        <input class="col-sm-4" type="text" placeholder="Enter the email" v-model="email" />
    </div>

    <hr style="color: orange"/>
    <h5 class="card-text" style="color:gray;">
        Shared links
    </h5> 
    <tr>
        <td>link do notatki</td>
        <td>
            <button @click.prevent="deleteNote" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
                    <img style="width: 30px" src = "../assets/trash-bin.svg"/></button>
        </td>
        <td>link do notatki</td>
        <td>
            <button @click.prevent="deleteNote" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
                    <img style="width: 30px" src = "../assets/trash-bin.svg"/></button>
        </td>
    </tr>

    <hr style="color: orange"/>
    <h5 class="card-text" style="color:gray;">
        Shared with other users
    </h5> 
    <tr>
        <td>user email</td>
        <td>
            <button @click.prevent="deleteNote" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
                    <img style="width: 30px" src = "../assets/trash-bin.svg"/></button>
        </td>
        <td>user email</td>
        <td>
            <button @click.prevent="deleteNote" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
                    <img style="width: 30px" src = "../assets/trash-bin.svg"/></button>
        </td>
    </tr>

    <hr style="color: orange"/>





    <hr style="color: orange"/>
    
  </div>
</template>
