import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import * as functions from '../utils/functions';

const useStyles = makeStyles(theme=>({
    padding:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    }
}))

export default function UpdateNote ({card,open,closeHandler,cb, ...rest}) {
    
    const classes = useStyles()
    const [title, setTitle] = useState(card.title);
    const [body, setBody] = useState(card.body);
    const [err, setErr] = useState();
    const [loading, setLoading] = useState(false);

    const nativeCloseHandler = () =>{
        closeHandler()
    }

    const handleAddNote = ()=>{
        if (title.trim().length===0) {
            setErr('Title is required');
            return;
        }
        setLoading(true);

        functions.updateNote(card.id,title.trim(),body)
            .then(result=>{
                if (!result ) {setErr('Something went wrong please try later'); return}
                if (result.error) {setErr(result.error); return;}
                cb(result);
                nativeCloseHandler();
            }).catch(error=>{
                console.log(error);
                setErr('Something went wrong');
            }).finally(()=>{
                setLoading(false);
            })
        
    }
    
    return (
        <Dialog open={open} onClose={nativeCloseHandler} >
            <DialogTitle>Add Note</DialogTitle>
            <DialogContent>
                {err&&<DialogContentText>{err}</DialogContentText>}
                <Grid container direction="column" justifyContent='space-between' spacing={2}>
                    <Grid item>
                        <TextField label="Title"
                        value={title} onChange={(event)=>setTitle(event.currentTarget.value)}
                        fullWidth variant="outlined"/>
                    </Grid>
                    <Grid item className={classes.padding}>
                        <TextField label="Body"
                        multiline
                        value={body} onChange={(event)=>setBody(event.currentTarget.value)}
                        fullWidth variant="outlined"/>
                    </Grid>
                    <Grid item>
                    <Button disabled={loading} variant="contained" color="secondary" onClick={handleAddNote}>Edit</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog> 
    );
}