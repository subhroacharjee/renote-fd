import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as functions from './utils/functions';
import * as constants from './utils/constants';
import GuestRoute from './components/GuestRoute';
import PrivateRoute from './components/PrivateRoutes';
import Loader from './components/Loader';
import SimpleNav from './components/SimpleNav';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
  diff: {
    marginTop: theme.mixins.toolbar.width
  }
}))

function App() {

  const classes = useStyles();
  const [auth,setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    functions.getUser()
      .then(result => {
        if (!result){ setAuth(false); localStorage.removeItem('access_token');};
        if (result.error){ setAuth(false); localStorage.removeItem('access_token');}
        setAuth(true);
      }).catch(err=>{
        console.log(err);
        setAuth(false);
        localStorage.removeItem('access_token');
      }).finally(()=>setLoading(false));
  },[]);

  const renderRoutes = () => {
    return (
      <div className={classes.diff}>
          <Switch>
            {
              constants.path.map((elem,index)=>{
                if (elem.guest) return <GuestRoute auth={auth} exact path={elem.path} component={elem.component} key={index}/>
                if (elem.auth) return <PrivateRoute auth={auth} exact path={elem.path} component={elem.component} key={index}/>
                return <Route exact path={elem.path} component={elem.component} key={index} />
              })
            }
          </Switch>
      </div>
    );
  }
  return (
      <>
        <SimpleNav auth={auth} loading={loading}/>
        {loading?<Loader/>:renderRoutes()}
      </>
  );
}

export default App;
