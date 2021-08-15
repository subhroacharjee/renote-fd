import { Backdrop, Button, Divider, Grid, makeStyles, Paper, Snackbar, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import * as functions from '../utils/functions';

const useStyles = makeStyles(theme=>({
    card:{
        width:300,
        padding: theme.spacing(1)
    }
}))

export default function Settings (){

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [err,setErr] = useState();
    const [open,setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateHandler = () => {
        setLoading(true)
        functions.updatePassword(password,newPassword)
            .then(result=>{
                if(!result) {setErr('Something went wrong'); return }
                if (result.error) {setErr(result.error); return}
                setErr('Password updated!');
                setOpen(true);
            }).catch(error=>{
                setErr('Something went wrong');
            }).finally(()=>{
                setOpen(true);
                setLoading(false);
            })
    }

    const classes = useStyles()
    return (
        <Backdrop open={true}>
            <Snackbar open={open} onClose={(event, reason)=>{if(reason!=='clickaway') setOpen(false)}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }} autoHideDuration={6000} message={err}/>
            <Paper className={classes.card}>
                <Typography variant='h5'>Settings</Typography>
                <Divider />
                <Grid container direction="column" spacing={1}>
                    <Grid item >
                        <TextField type='password' label='Old password' 
                            value={password} onChange={(event)=>setPassword(event.currentTarget.value)} fullWidth
                            />
                    </Grid>
                    <Grid item >
                    <TextField type='password' label='New password' 
                            value={newPassword} onChange={(event)=>setNewPassword(event.currentTarget.value)} fullWidth
                            />
                    </Grid>
                    <Grid item>
                        <Button variant='contained' onClick={updateHandler}>Update</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Backdrop>
    );
}