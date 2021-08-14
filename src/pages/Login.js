import { Backdrop, Button, CircularProgress, Divider, Grid, makeStyles, Paper, Snackbar, TextField, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import googleSignUp from "../assets/btn_google_signin_dark_normal_web.png";
import * as firebaseLogin from "../utils/firebase";
import * as functions from '../utils/functions';

const useStyles = makeStyles(theme=>({
    card: {
        padding:theme.spacing(2),
        width:300,
        backgroundColor: grey["300"]
    },
    googleSignup: {
        width:'100%',
        backgroundRepeat:'no-repeat',
        backgroundSize:'contain',
        objectFit: 'contain',
        
    },
    googleImg: {
        
    }
}))

export default function Login (props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState();
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        document.title = 'Noted-Re: Login'
    })

    const handleGoogleLogin = ()=>{
        setLoading(true);

        firebaseLogin.loginWithGoogle()
            .then (result=>{
                if(result.error) {
                    setError (result.error);
                    setOpen(true)
                }else{
                    window.location.reload();
                }
            }).catch(err=>{
                console.log(err);
                setError('Something went wrong');
                setOpen(true)
            }).finally(()=>{
                setLoading(false);
            })
    }

    const handleNormalLogin = ()=> {
        setLoading(true);
        if (email.trim().length === 0) {
            setError('Email is required!');
            return;
        }
        
        functions.Login(email.trim(), password)
            .then( data=>{
                if (!data) {
                    setError('Something went wrong please try again');
                }
                else if (data.error) {
                    setError(data.error);
                    setOpen(true)
                }else{
                    localStorage.setItem('access_token', data.body.access_token);
                    window.location.reload();
                }
            }).catch(err =>{
                console.log(err);
                setError('Something went wrong');
                setOpen(true)
            }).finally(()=>{
                setLoading(false);
                setPassword('');
            })
    }

    const handleRedirectToRegister = ()=>{
        history.push('/register');
    }

    const classes = useStyles();

    const renderCard = () => {
        return (
            <Paper className={classes.card}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Typography variant="h5">Noted-Re</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <Button className={classes.googleSignup} onClick = {handleGoogleLogin}>
                            <img src={googleSignUp} alt='google signup img' className={classes.googleImg} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <TextField variant="outlined" type="email" label="Email" fullWidth value={email} onChange={(event)=>setEmail(event.currentTarget.value) } />
                    </Grid>
                    <Grid item>
                        <TextField variant="outlined" type="password" label="Password" fullWidth value={password} onChange={event=>setPassword(event.currentTarget.value)} />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleNormalLogin}>Login</Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="textSecondary" onClick = {handleRedirectToRegister}>Don't have and account? register</Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
    return (
        <Backdrop open={true}>
            <Snackbar open={open} anchorOrigin = {
                {
                    vertical:'top',
                    horizontal:'center'
                }
            }
            autoHideDuration={6000}
            onClose={(event,reason) => {
                if (reason === 'clickaway') {
                    return;
                  }
              
                  setOpen(false);
            }}
            message={error}
            />
            {loading?<CircularProgress/>:renderCard()}
        </Backdrop>
    );
}