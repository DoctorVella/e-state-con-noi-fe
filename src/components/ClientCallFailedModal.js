import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const ClientCallFailedModal = () => {
    const { openClientCallFailedModal, setOpenClientCallFailedModal} = useContext(GlobalContext);

    return (
        <Dialog open={openClientCallFailedModal}>
            <DialogTitle>
                I nostri sistemi sono offline!
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Purtroppo stiamo riscontrando dei problemi,<br/> ti chiediamo cortesemente di riprovare più tardi...
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {setOpenClientCallFailedModal(false)}}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ClientCallFailedModal;