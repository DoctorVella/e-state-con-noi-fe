import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { ACTIVITY_TYPES } from "../util/Constants";
import * as Yup from "yup";

const ActivityModal = ({open,setOpen,provideActivity,initialValues}) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const validationSchema = Yup.object({
        name: Yup.string().required("obbligatorio"),
        type: Yup.string().required("obbligatorio"),
        description: Yup.string()
    })

    const { handleSubmit, control, reset } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })

    useEffect(() => {
        reset(initialValues);
    },[open])

    const onSubmit = (values) => {
        provideActivity(values);
        setOpen(false);
    }

    return (<>
        <Dialog open={open}>
            <DialogTitle>
                Inserisci le info dell'attività!
            </DialogTitle>
            <form style={{width: isLargeScreen ? "400px" : "300px"}} onSubmit={ handleSubmit(onSubmit) }>
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
                                name="type"
                                render={({ field, fieldState }) => (
                                    <TextField
                                        fullWidth
                                        label="Tipo"
                                        select
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    >
                                        {Array.from(ACTIVITY_TYPES, ([key, value]) => <MenuItem key={key} value={key}>{value.label}</MenuItem>)}
                                    </TextField>
                                )} />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name="description"
                                render={({ field, fieldState }) => (
                                    <TextField
                                        fullWidth
                                        label="Descrizione"
                                        multiline
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
        </Dialog>
    </>);
}

export default ActivityModal;