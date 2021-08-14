import { AppBar, Button, Hidden, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Dashboard as DashboardIcon, ExitToApp, Settings as SettingsIcon } from "@material-ui/icons";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));  

export default function SimpleNav({auth,...rest}) {
    const classes = useStyles()

    const history = useHistory();

    const handleLogout = ()=>{
        localStorage.removeItem('access_token');
        window.location.reload();
    }

    const handleGotoDashBoard = () => {
        console.log(history);
        history.push('/');
    }

    const handleGotoSettings = ()=>{
        history.push('/settings')
    }

    if (!auth) {
        return (<></>);
    }else{
        return (
            <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Noted-Re
              </Typography>
              <Button color="inherit" onClick={handleGotoDashBoard}> <DashboardIcon aria-label='Dashboard'/> <Hidden smDown={true}>Dashboard</Hidden></Button>
              <Button color="inherit" onClick={handleGotoSettings}> <SettingsIcon aria-label='Settings'/> <Hidden smDown={true}>Settings</Hidden></Button>
              <Button color="inherit" onClick={handleLogout}> <ExitToApp aria-label='Logout'/> <Hidden smDown={true}>Logout</Hidden></Button>
            </Toolbar>
          </AppBar>
        ); 
    }

}