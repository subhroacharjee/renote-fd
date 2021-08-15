import { Grid, Typography } from "@material-ui/core";
import Note from "./note";

export default function NoteList ({notesAr,setNotesAr}) {

    const deleteANote = (id)=>{
        setNotesAr(notesAr.filter(note=>note.id!==id));
    }
    const updateANote = (editedNote) =>{
        setNotesAr(notesAr.map(note=>{
            if (note.id === editedNote.id) return editedNote;
            return note;
        }))
    }
    if (notesAr.length===0){
        return (
            <Typography variant='button' color='textSecondary'>No Notes</Typography>
        );
    }else{
        return (
            <Grid container spacing={2} >
                {notesAr.map((note,index)=>{
                    return (
                        <Grid item xs={12} md={6} lg={3} key={index}>
                            <Grid container justifyContent='center' >
                                <Grid item >
                                    <Note {...note} deleteHandler={deleteANote} changeHandler={updateANote}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
        );
    }
}