import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import bootstrap from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/SignIn.vue") },
        { path: "/register", component: () => import("../views/SignUp.vue") },
        { path: "/sign-in", component: () => import("../views/SignIn.vue") },       
        
        {
            path: "/home", component: () => import("../views/Home.vue"), meta: {
                requiresAuth: true,
            }
        },
        { path: "/add-note", component: () => import("../views/AddNote.vue") },
        {
            path: "/notes/:id", name:'note', component: () => import("../views/NoteView-screen.vue"), meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/share/:id", name:'share', component: () => import("../views/ShareNote.vue"), meta: {
                requiresAuth: true,
            }
        },{
            path: "/shared/:id", name:'sharednote', component: () => import("../views/DisplaySharedNote.vue"), meta: {
                requiresAuth: true,
            }
        },

    ],
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next()
        } else {
            next("/");
            alert("no access");
        }

    } else {
        next();
    }
});
export default router;
