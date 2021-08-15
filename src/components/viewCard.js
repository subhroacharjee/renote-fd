import { Dialog, DialogContent, Typography } from "@material-ui/core";

export default function ViewCards ({card, open, closeHandler}) {
    return (
        <Dialog open={open} onClose={closeHandler}>
            <DialogContent>
                <Typography variant='h5'>{card.title}</Typography>
                <Typography variant='body2' color='textSecondary'>{card.created_at}</Typography>
                <Typography variant='h6'>{card.body}</Typography>
            </DialogContent>
           
        </Dialog>
    );
}