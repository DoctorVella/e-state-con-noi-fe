import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { SUBACTIVITY_TYPES, SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 } from "../util/Constants";

const SubactivityModal = ({ open, setOpen, provideSubactivity, initialValues }) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const validationSchema = Yup.object({
        name: Yup.string().test("name","obbligatorio", (value, context) => {
            const {type} = context?.parent;
            return type === SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 || value;
        }), 

    })

    const { handleSubmit, control, reset, watch } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })

    useEffect(() => {
        reset(initialValues);
    }, [open])

    const onSubmit = (values) => {
        provideSubactivity(values);
        setOpen(false);
    }

    return (<>
        <Dialog open={open}>
            <DialogTitle>
                Inserisci info {SUBACTIVITY_TYPES.get(initialValues.type).label}
            </DialogTitle>
            <form style={{ width: isLargeScreen ? "400px" : "300px" }} onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        {initialValues.type === SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 ?
                            <Grid container item spacing={2}>
                                <Grid item xs={12}>
                                    TEST MANCHE 1VS1
                                </Grid>
                            </Grid> :
                            <Grid container item spacing={2}>
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
                        }
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

export default SubactivityModal;