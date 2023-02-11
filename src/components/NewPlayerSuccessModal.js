import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { AUTH_LEVEL_ISCRITTORE } from "../util/Constants";

const NewPlayerSuccessModal = ({open, setOpen}) => {

    const getDialogDescription = () => {
        if(localStorage.getItem("authLevel") === AUTH_LEVEL_ISCRITTORE) {
            return <Typography>Ti aspettiamo in parrocchia per saldare la quota,<br/> rendendo così effettiva l'iscrizione!</Typography>
        }else {
            return <Typography>Adesso puoi visualizzare il dettaglio del partecipante!</Typography>
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                Partecipante iscritto con successo!
            </DialogTitle>
            <DialogContent>
                {getDialogDescription()}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {setOpen(false)}}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewPlayerSuccessModal;