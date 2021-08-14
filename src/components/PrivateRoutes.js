import { Redirect, Route } from "react-router";

export default function PrivateRoute ({component:Component, auth, ...rest}) {
    return (
        <Route {...rest} 
            render = {props=>(auth?<Component {...props} />:<Redirect to='/login'/>)}
            />
    );
}