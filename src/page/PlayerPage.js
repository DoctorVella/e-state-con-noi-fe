import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowBack } from "@mui/icons-material";
import { Button, Grid, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import usePlayerActions from "../services/usePlayerActions";
import { DEFAULT_1W_BROTHER, DEFAULT_1W_STANDARD, DEFAULT_2W_BROTHER, DEFAULT_2W_STANDARD, PLAYER_PAGE_CREATE_MODE, PLAYER_PAGE_UPDATE_MODE, PLAYER_PAGE_VIEW_MODE } from "../util/Constants";

const PlayerPage = ({ mode }) => {
    const navigate = useNavigate();
    const [currentMode, setCurrentMode] = useState(mode);
    const playerActions = usePlayerActions();
    const {_id} = useParams();

    const getPageDescription = () => {
        if(currentMode === PLAYER_PAGE_CREATE_MODE) {
            return "Crea un nuovo partecipante!"
        }else if(currentMode === PLAYER_PAGE_VIEW_MODE) {
            return "Dettaglio del partecipante!"
        }else{
            return "Modifica il partecipante!"
        }
    }

    const getPageMainButton = () => {
        if(currentMode === PLAYER_PAGE_VIEW_MODE) {
            return <Button fullWidth variant="contained" onClick={() => {setCurrentMode(PLAYER_PAGE_UPDATE_MODE)}}>Modifica</Button>
        }else{
            return <Button fullWidth variant="contained" type="submit">Invia</Button>
        }
    }

    const initialValues = {
        name: "",
        surname: "",
        age: 0,
        phone: "",
        weekNumber: 2,
        notes: "",
        isBrother: false,
        isSponsor: false,
        isException: false,
        isPayed: false,
        fee: DEFAULT_2W_STANDARD
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("obbligatorio"),
        surname: Yup.string().required("obbligatorio"),
        age: Yup.number().required("obbligatorio"),
        phone: Yup.string().required("obbligatorio"),
        weekNumber: Yup.number().required("obbligatorio"),
        notes: Yup.string().nullable(),
        isBrother: Yup.boolean().required("obbligatorio"),
        isSponsor: Yup.boolean().required("obbligatorio"),
        isException: Yup.boolean().required("obbligatorio"),
        isPayed: Yup.boolean().required("obbligatorio"),
        fee: Yup.number().required("obbligatorio")
    })

    const { handleSubmit, control, reset, watch, setValue } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })

    const fetchPlayers = async () => {
        let res = await playerActions.findPlayerAsAnimatore(_id);
        console.log(res[0]);
        reset(res[0]);
    }

    // const initForm = async () => {
    //     if(currentMode !== PLAYER_PAGE_CREATE_MODE){
    //         let player = await playerActions.findPlayerAsAnimatore(_id);
    //         reset(player);
    //     }else{
    //         reset(initialValues);
    //     }
    // }

    useEffect(() => {
        if(currentMode !== PLAYER_PAGE_CREATE_MODE){
            fetchPlayers();
        }
        // initForm();
    },[])

    const onSubmit = async (values) => {
        if(currentMode === PLAYER_PAGE_CREATE_MODE) {
            await playerActions.insertPlayerAsAnimatore(values);
            //TODO
        }else{
            //TODO
        }
    }

    const updateFee = () => {
        if(watch("isSponsor") || watch("isException")) {
            setValue("fee",0);
        }else if(watch("weekNumber") === 2) {
            setValue("fee", watch("isBrother") ? DEFAULT_2W_BROTHER : DEFAULT_2W_STANDARD);
        }else{
            setValue("fee", watch("isBrother") ? DEFAULT_1W_BROTHER : DEFAULT_1W_STANDARD);
        }
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={0} md={2} />
                <Grid item xs={3} md={1}>
                    <IconButton variant="filled" onClick={() => {navigate("/user")}}>
                        <ArrowBack />
                    </IconButton>
                </Grid>
                <Grid item xs={7} md={6}>
                    <Typography variant="h3">
                        {getPageDescription()}
                    </Typography>
                </Grid>
                <Grid item xs={0} md={2} />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
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
                <Grid item xs={0} md={2} />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={4}>
                    <Controller
                        control={control}
                        name="age"
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                label="Età"
                                type="number"
                                inputProps={{min:5, max:14}}
                                value={field.value}
                                onChange={field.onChange}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )} />
                </Grid>
                <Grid item xs={12} md={4}>
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
                <Grid item xs={0} md={2} />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={2}>
                    <Controller
                        control={control}
                        name="weekNumber"
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                label="Settimane di partecipazione"
                                select
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    updateFee();
                                }}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                            </TextField>
                        )} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Controller
                        control={control}
                        name="isBrother"
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                label="Ha un fratello"
                                select
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    updateFee();
                                }}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                <MenuItem value={true}>SI</MenuItem>
                                <MenuItem value={false}>NO</MenuItem>
                            </TextField>
                        )} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Controller
                        control={control}
                        name="isSponsor"
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                label="Sponsor"
                                select
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    updateFee();
                                }}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                <MenuItem value={true}>SI</MenuItem>
                                <MenuItem value={false}>NO</MenuItem>
                            </TextField>
                        )} />
                </Grid> 
                <Grid item xs={12} md={2}>
                    <Controller
                        control={control}
                        name="isException"
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                label="Caso Eccezionale"
                                select
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    updateFee();
                                }}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                <MenuItem value={true}>SI</MenuItem>
                                <MenuItem value={false}>NO</MenuItem>
                            </TextField>
                        )} />
                </Grid>
                <Grid item xs={0} md={2} />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={4}>
                    <Controller
                        control={control}
                        name="isPayed"
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                label="Quota Pagata"
                                select
                                value={field.value}
                                onChange={field.onChange}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                <MenuItem value={true}>SI</MenuItem>
                                <MenuItem value={false}>NO</MenuItem>
                            </TextField>
                        )} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Controller
                        control={control}
                        name="fee"
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                label="Importo"
                                type={"number"}
                                inputProps={{min:0, max:100}}
                                disabled={!watch("isSponsor") && !watch("isException")}
                                value={field.value}
                                onChange={field.onChange}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )} />
                </Grid>
                <Grid item xs={0} md={2} />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={8}>
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
                <Grid item xs={0} md={2} />
                <Grid item xs={0} md={2} />
                <Grid item xs={5} md={4} >
                    <Button fullWidth variant="outlined" onClick={() => {reset();}}>Svuota</Button>
                </Grid>
                <Grid item xs={5} md={4} >
                    {getPageMainButton()}
                </Grid>
                <Grid item xs={0} md={2} />
            </Grid>
        </form>
    </>
}

export default PlayerPage;