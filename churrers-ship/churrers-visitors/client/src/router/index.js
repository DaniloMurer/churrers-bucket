import { createWebHistory, createRouter } from "vue-router"
import Code from "@/views/Code.vue";
import Home from "@/views/Home.vue";
import MessageBoard from "@/views/MessageBoard.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/code",
        name: "Code",
        component: Code
    },
    {
        path:  "/messageboard",
        name: "MessageBoard",
        component: MessageBoard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router