import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField, useMediaQuery, useTheme } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import usePlayerActions from "../services/usePlayerActions";
import NewPlayerSuccessModal from "./NewPlayerSuccessModal";
import { useState } from "react";

const NewPlayerModal = ({ open, setOpen }) => {
    const playerActions = usePlayerActions();
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const initialValues = {
        name: "",
        surname: "",
        age: "",
        phone: "",
        weekNumber: 2,
        notes: ""
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("obbligatorio"),
        surname: Yup.string().required("obbligatorio"),
        age: Yup.number().required("obbligatorio").min(6,"Età minima ammessa: 6 anni").max(13,"Età massima ammessa: 13 anni"),
        phone: Yup.string().required("obbligatorio"),
        weekNumber: Yup.number().required("obbligatorio"),
        notes: Yup.string().nullable()
    })

    const { handleSubmit, control, reset } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (values) => {
        let isSuccess = await playerActions.insertPlayer(values);
        if (isSuccess) {
            setOpen(false);
            reset();
            setOpenSuccessModal(true);
        } else {
            setOpen(false);
        }
    }

    return (
        <>
            <Dialog open={open}>
                <DialogTitle>
                    Inserisci i dati del partecipante!
                </DialogTitle>
                <form style={{ width: isLargeScreen ? "400px" : "300px" }} onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            fullWidth
                                            label="Nome"
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
                                    name="surname"
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            fullWidth
                                            label="Cognome"
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
                                    name="age"
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            fullWidth
                                            label="Età"
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
                                    name="phone"
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            fullWidth
                                            label="Telefono del genitore"
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
                                    name="weekNumber"
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            fullWidth
                                            label="Settimane di partecipazione"
                                            select
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </TextField>
                                    )} />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="notes"
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            fullWidth
                                            label="Eventuali note"
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
                        <Button variant="outlined" onClick={() => {
                            setOpen(false);
                            reset();
                        }}>Chiudi</Button>
                        <Button variant="contained" type="submit">Invia</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <NewPlayerSuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
        </>
    );
}

export default NewPlayerModal;