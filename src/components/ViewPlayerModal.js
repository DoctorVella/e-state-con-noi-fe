import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import usePlayerActions from "../services/usePlayerActions";
import ExpandMore from "@mui/icons-material/ExpandMore";

const ViewPlayerModal = ({ open, setOpen }) => {
    const [players, setPlayers] = useState([]);
    const playerActions = usePlayerActions();

    const fetchPlayers = async () => {
        setPlayers(await playerActions.findPlayer());
    }

    useEffect(() => {
        if (open) {
            fetchPlayers();
        }
    }, [open])

    return (
        <Dialog open={open}>
            <DialogTitle>
                Ecco i partecipanti che hai iscritto:
            </DialogTitle>
            <DialogContent style={{ width: "400px" }}>
                {players && players.length > 0 ?
                    players?.map(p => <Accordion key={p._id}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography> {p.name + " " + p.surname}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {"Età: " + p.age}<br/>
                                {"Telefono del genitore: " + p.phone}<br/>
                                {"Settimane di partecipazione: " + p.weekNumber}<br/>
                                {"Note: " + p.notes}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    ) : null
                }
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => { setOpen(false) }}>OK</Button>
            </DialogActions>
        </Dialog>
    );

}

export default ViewPlayerModal;