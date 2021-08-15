import {makeStyles, Fab, Snackbar} from '@material-ui/core';
import {Add as AddIcon} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import * as functions from '../utils/functions';

import Loader from '../components/Loader'
import AddNote from '../components/addNote';
import NoteList from '../components/noteList';


const useStyles = makeStyles(theme=>({
    root: {
        position: 'relative',
    },
    floatingBtn: {
        position: 'fixed',
        bottom:10,
        right: 10
    },
    marginTop:{
        marginTop: 10,
        paddingLeft: 10,
        maxWidth:'95vw'
    }
}))

export default function Dashboard (props) {
    const classes = useStyles();
    const [noteAr, setNoteAr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState();
    const [openErrorPrompt, setOpenErrorPrompt] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    useEffect(()=>{
        document.title = 'Noted-Re: Dashboard'
        functions.getNotes()
            .then(result=>{
                if (!result) {
                    setErrorMsg('Something went wrong');
                    setOpenErrorPrompt(true);
                }
                setNoteAr(result);
            }).catch(err=>{
                console.log(err);
                setErrorMsg('Something went wrong');
                setOpenErrorPrompt(true);
            }).finally(()=>{
                setLoading(false)
            })
    },[])


    const handleClickOnAdd = () =>{
        if (loading) return;
        setOpenCreateDialog(true)
    }

    const renderNotes = ()=>{
        if (loading) {
            return (
                <Loader/>
            );
        }else{
            return (
                <div className={classes.marginTop}>
                    <NoteList notesAr={noteAr} setNotesAr={setNoteAr}/>
                </div>
            );
        }
    }

    const handleAddNotes = (note) =>{
        setNoteAr( [note, ...noteAr,])
    }

    return (
        <div className={classes.root}>
            <Fab onClick={handleClickOnAdd} color="secondary" aria-label="add" className={classes.floatingBtn}>
                <AddIcon />
            </Fab>
            <Snackbar open={openErrorPrompt} onClose={(event, reason)=>{if(reason!=='clickaway') setOpenErrorPrompt(false)}}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }} autoHideDuration={6000} message={errorMsg}/>
            {openCreateDialog&&<AddNote open={openCreateDialog} 
                closeHandler={()=>setOpenCreateDialog(false)} 
                cb={handleAddNotes}/>}
            {renderNotes()}
        </div>
    );
}