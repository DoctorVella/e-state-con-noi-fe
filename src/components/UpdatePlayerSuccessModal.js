import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const UpdatePlayerSuccessModal = ({open, setOpen}) => {

    return (
        <Dialog open={open}>
            <DialogTitle>
                Partecipante aggiornato con successo!
            </DialogTitle>
            <DialogContent>
                <Typography>Adesso puoi visualizzare il dettaglio del partecipante!</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {setOpen(false)}}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdatePlayerSuccessModal;