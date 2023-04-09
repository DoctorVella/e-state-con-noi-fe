import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useMediaQuery, useTheme } from "@mui/material";

const ConfirmModal = ({ open, setOpen, title, description, confirmFn}) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <div style={{ width: isLargeScreen ? "400px" : "300px" }}>
                <DialogContent>
                    <Typography>{description}</Typography>
                </DialogContent>
                <DialogActions style={{ justifyContent: "space-between" }}>
                    <Button variant="outlined" onClick={() => { setOpen(false); }}>Chiudi</Button>
                    <Button variant="contained" onClick={() => { 
                        confirmFn();
                        setOpen(false);
                    }}>Conferma</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default ConfirmModal;