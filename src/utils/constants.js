import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Settings from "../pages/Settings";

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
    },
    
    {
        name:'Settings',
        path: '/settings',
        component: Settings,
        auth: true
    }
];