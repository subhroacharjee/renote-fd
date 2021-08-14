import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const path = [
    {
        name:'Login',
        path:'/login',
        component:Login,
        guest: true
    },

    {
        name:'Register',
        path:'/register',
        component:Register,
        guest: true
    },

    {
        name:'Dashboard',
        path: '/',
        component: Dashboard,
        auth: true
    }
];