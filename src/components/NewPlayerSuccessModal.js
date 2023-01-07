import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const NewPlayerSuccessModal = ({open, setOpen}) => {

    return (
        <Dialog open={open}>
            <DialogTitle>
                Partecipante iscritto con successo!
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Ti aspettiamo in parrocchia per saldare la quota,<br/> rendendo così effettiva l'iscrizione!
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {setOpen(false)}}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewPlayerSuccessModal;