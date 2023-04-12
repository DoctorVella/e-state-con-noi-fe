import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ScoreModal = ({ open, setOpen, provideScore }) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const validationSchema = Yup.object({
        description: Yup.string().required("obbligatorio")
    })

    const { handleSubmit, control, reset } = useForm({
        resolver: yupResolver(validationSchema)
    })

    useEffect(() => {
        reset();
    }, [open])

    const onSubmit = (values) => {
        provideScore(values);
        setOpen(false);
    }

    return (<Dialog open={open}>
        <DialogTitle>Inserisci le info del punteggio</DialogTitle>
        <form style={{ width: isLargeScreen ? "400px" : "300px" }} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field, fieldState }) => (
                                <TextField
                                    fullWidth
                                    label="Descrizione"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )} />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="azzurriScore"
                            render={({ field, fieldState }) => (
                                <TextField
                                    fullWidth
                                    label="Punteggio Azzurri"
                                    type="number"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )} />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="gialliScore"
                            render={({ field, fieldState }) => (
                                <TextField
                                    fullWidth
                                    label="Punteggio Gialli"
                                    type="number"
                                    number
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )} />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="rossiScore"
                            render={({ field, fieldState }) => (
                                <TextField
                                    fullWidth
                                    label="Punteggio Rossi"
                                    type="number"
                                    number
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )} />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="verdiScore"
                            render={({ field, fieldState }) => (
                                <TextField
                                    fullWidth
                                    label="Punteggio Verdi"
                                    type="number"
                                    number
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions style={{ justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={() => { setOpen(false); }}>Chiudi</Button>
                <Button variant="contained" type="submit">Conferma</Button>
            </DialogActions>
        </form>
    </Dialog>);
}

export default ScoreModal;