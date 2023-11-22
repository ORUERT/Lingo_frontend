// import SignIn from "@/view/Sign-In";
import fof from "@/view/404"
import test from "@/view/test"
import SignIn2 from "@/view/Sign-in2";
import home from "@/view/home";
import chat from "@/view/ChatWindow";
import SignUp from "@/view/Sign-Up"
import {createRouter,createWebHistory} from "vue-router";

let routes = [

    // {
    //     path: '/',
    //     name: 'Sign-In',
    //     component: SignIn,
    // },
    // {
    //     path:'/',
    //     name:'test',
    //     component: test,
    // },
    {
        path:'/login',
        name:'SignIn2',
        component: SignIn2,
    },
    {
        path:'/home',
        name:'home',
        component: home,
        meta:{
            requireAuth:true
        }
    },
    // {
    //     path:'/chat',
    //     name:'chat',
    //     component: chat,
    // },
    {
        path: '/register',
        name: 'Sign-up',
        component: SignUp,
    },
    {
        path: '/404',
        name: '/404',
        component: fof,
    },
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
    route.meta = route.meta || {} ;
    route.meta.layout = route.layout || parentLayout ;

    if( route.children )
    {
        route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
    }
    return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior (to, from, savedPosition) {
        if ( to.hash ) {
            return {
                selector: to.hash,
                behavior: 'smooth',
            }
        }
        return {
            x: 0,
            y: 0,
            behavior: 'smooth',
        }
    }
})
export default router;