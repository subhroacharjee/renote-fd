import {makeStyles, Fab} from '@material-ui/core';
import {Add as AddIcon} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import * as functions from '../utils/functions';

import Loader from '../components/Loader'

const useStyles = makeStyles(theme=>({
    root: {
        position: 'relative',
    },
    floatingBtn: {
        position: 'fixed',
        bottom:10,
        right: 10
    }
}))

export default function Dashboard (props) {
    const classes = useStyles();
    const [noteAr, setNoteAr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState();
    const [openErrorPrompt, setOpenErrorPrompt] = useState(false);

    useEffect(()=>{
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
    }

    const renderNotes = ()=>{
        if (loading) {
            return (
                <Loader/>
            );
        }else{
            return (
                <></>
            );
        }
    }

    return (
        <div className={classes.root}>
            <Fab onClick={handleClickOnAdd} color="secondary" aria-label="add" className={classes.floatingBtn}>
                <AddIcon />
            </Fab>
            {renderNotes()}
        </div>
    );
}