import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import usePlayerActions from "../services/usePlayerActions";
import ExpandMore from "@mui/icons-material/ExpandMore";

const ViewPlayerModal = ({ open, setOpen }) => {
    const [players, setPlayers] = useState([]);
    const playerActions = usePlayerActions();
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const fetchPlayers = async () => {
        let player = await playerActions.findPlayer();
        if(player) {
            setPlayers(player);
        } else {
            setOpen(false);
        }
    }

    useEffect(() => {
        if (open) {
            fetchPlayers();
        }
    }, [open])

    return (
        <Dialog open={open}>
            <DialogTitle>
                {players && players.length > 0 ? "Ecco i partecipanti che hai iscritto:" : "Non hai iscritto nessun partecipante."}
            </DialogTitle>
            <DialogContent style={{ width: isLargeScreen ? "400px" : "300px" }}>
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