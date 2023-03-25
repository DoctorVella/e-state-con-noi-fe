import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { SUBACTIVITY_TYPES, SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1, TEAM_NAMES } from "../util/Constants";

const SubactivityModal = ({ open, setOpen, provideSubactivity, initialValues }) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const validationSchema = Yup.object({
        name: Yup.string().test("name","obbligatorio", (value, context) => {
            const {type} = context?.parent;
            return type === SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 || value;
        }), 
        manche1team1: Yup.string().test("manche1team1","obbligatorio", (value,context) => {
            const {type} = context?.parent;
            return type !== SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 || value;
        }),
        manche1team2: Yup.string().test("manche1team2","obbligatorio", (value,context) => {
            const {type} = context?.parent;
            return type !== SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 || value;
        }),
        manche2team1: Yup.string().test("manche2team1","obbligatorio", (value,context) => {
            const {type} = context?.parent;
            return type !== SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 || value;
        }),
        manche2team2: Yup.string().test("manche2team2","obbligatorio", (value,context) => {
            const {type} = context?.parent;
            return type !== SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 || value;
        })
    })

    const { handleSubmit, control, reset, watch, setValue } = useForm({
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

    const updateMancheTeamField = (fieldName, newValue) => {
        const fieldNamesToCheck = ['manche1team1','manche1team2','manche2team1','manche2team2'];
        fieldNamesToCheck.forEach(fn => {
            if(fn !== fieldName && watch(fn) === newValue) {
                setValue(fn,"");
            }
        });
    }

    return (<>
        <Dialog open={open}>
            <DialogTitle>
                Inserisci info {SUBACTIVITY_TYPES.get(initialValues?.type)?.label}
            </DialogTitle>
            <form style={{ width: isLargeScreen ? "400px" : "300px" }} onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        {initialValues?.type === SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 ?
                            <Grid container item spacing={2}>
                                <Grid item xs={12}>
                                    <Controller
                                        control={control}
                                        name="manche1team1"
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                fullWidth
                                                label="Manche 1 team 1"
                                                select
                                                value={field.value}
                                                onChange={(e) => {
                                                    updateMancheTeamField("manche1team1",e.target.value);
                                                    field.onChange(e);
                                                }}
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                            >
                                                {TEAM_NAMES.map(tn => <MenuItem key={tn} value={tn}>{tn}</MenuItem>)}
                                            </TextField>
                                        )} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        control={control}
                                        name="manche1team2"
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                fullWidth
                                                label="Manche 1 team 2"
                                                select
                                                value={field.value}
                                                onChange={(e) => {
                                                    updateMancheTeamField("manche1team2",e.target.value);
                                                    field.onChange(e);
                                                }}
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                            >
                                                {TEAM_NAMES.map(tn => <MenuItem key={tn} value={tn}>{tn}</MenuItem>)}
                                            </TextField>
                                        )} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        control={control}
                                        name="manche2team1"
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                fullWidth
                                                label="Manche 2 team 1"
                                                select
                                                value={field.value}
                                                onChange={(e) => {
                                                    updateMancheTeamField("manche2team1",e.target.value);
                                                    field.onChange(e);
                                                }}
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                            >
                                                {TEAM_NAMES.map(tn => <MenuItem key={tn} value={tn}>{tn}</MenuItem>)}
                                            </TextField>
                                        )} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        control={control}
                                        name="manche2team2"
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                fullWidth
                                                label="Manche 2 team 2"
                                                select
                                                value={field.value}
                                                onChange={(e) => {
                                                    updateMancheTeamField("manche2team2",e.target.value);
                                                    field.onChange(e);
                                                }}
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                            >
                                                {TEAM_NAMES.map(tn => <MenuItem key={tn} value={tn}>{tn}</MenuItem>)}
                                            </TextField>
                                        )} />
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