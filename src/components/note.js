import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import { red, yellow } from "@material-ui/core/colors";
import { useState } from "react";
import * as functions from '../utils/functions'
import UpdateNote from "./updateNote";
import ViewCards from "./viewCard";

const useStyle = makeStyles(theme=>({
    card: {
        width:300,
        marginBottom:10
    },
    delete:{
        backgroundColor: red['300']
    },
    edit :{
        backgroundColor: yellow['300']
    },
}))

export default function Note({id,title,body, created_at,deleteHandler,changeHandler}){

    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const handleDelete = () =>{
        if (!window.confirm('Are you sure you want to delete?')) return;
        functions.deleteNote(id)
            .then(result =>{
                if(result) deleteHandler(id);
            }).catch(err=>{
                console.log(err);
            })
    }


    const classes = useStyle();

    return (
        <>
        {openView&&<ViewCards 
            card={{title:title,body:body,created_at:created_at}}
            open={openView}
            closeHandler={()=>{setOpenView(false)}} />}
        {openEdit&&<UpdateNote card={{id:id,title:title,body:body}} open={openEdit} closeHandler={()=>setOpenEdit(false)} cb={changeHandler} />}
        <Card className={classes.card} >
           <CardContent>
                    <Typography gutterBottom variant='h5'>{title}</Typography>
                    <Typography variant="h6" component='p' noWrap>
                        {body}
                    </Typography>
                    <Typography variant='body2' color="textSecondary" >
                       Created at: {created_at.slice(0,10)}
                    </Typography>
                </CardContent>
            <CardActions>
                <Button size="small" variant='contained' onClick={()=>setOpenView(true)}>
                    View
                </Button>
                <Button size="small" variant='contained' className={classes.edit} onClick={()=>setOpenEdit(true)}>
                    Edit
                </Button>
                <Button size="small" variant='contained' className={classes.delete} onClick={handleDelete}>
                    Delete
                </Button>
            </CardActions>
        </Card>
        </>
    );
}