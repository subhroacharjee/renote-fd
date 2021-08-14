import { Redirect, Route } from "react-router";

export default function GuestRoute ({component: Component, auth, ...rest}) {
    return (
        <Route {...rest}
            render= {
                (props)=>(auth?<Redirect to='/' {...props}/>:<Component {...props}/>)
            }
            />
    );
}