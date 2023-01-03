import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import useAuthActions from "../services/useAuthActions";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const RegisterModal = () => {
    const {openRegisterModal, setOpenRegisterModal} = useContext(GlobalContext);
    const navigate = useNavigate();
    const authActions = useAuthActions();
    const [isError, setIsError] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [fetch,setFetch] = useState(0);

    const initialValues = {
        username: "",
        name: "",
        surname: "",
        password: "",
        confirmPassword: ""
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("obbligatorio"),
        name: Yup.string().required("obbligatorio"),
        surname: Yup.string().required("obbligatorio"),
        password: Yup.string().required("obbligatorio"),
        confirmPassword: Yup.string().required("obbligatorio")
    })

    const { handleSubmit, control, reset } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (values) => {
        let isRegistered = await authActions.register(values);
        setIsRegistered(isRegistered);
        setIsError(!isRegistered);
        if(isRegistered) {
            
            
            setOpenRegisterModal(false);
            reset();
            setFetch(fetch+1);
        }
    }

    // useEffect(() => {
    //     if(isRegistered) {
    //         console.log("HERE 2")
    //         redirect("/user");

    //     }  
    // },[fetch])

    return (
        <Dialog open={openRegisterModal}>
            <DialogTitle>
                Crea il tuo utente!
            </DialogTitle>
            <form style={{width: "400px"}} onSubmit={ handleSubmit(onSubmit) }>
                <DialogContent>
                    <Grid container spacing={2}>
                        {isError ?
                            <Grid item xs={12}>
                                <Typography color="error">
                                    Username già presente. Scegli un altro username!
                                </Typography>
                            </Grid> : <></>
                        }
                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field, fieldState }) => (
                                    <TextField
                                        fullWidth
                                        label="Nome Utente"
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
                                name="password"
                                render={({ field, fieldState }) => (
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
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
                                name="confirmPassword"
                                render={({ field, fieldState }) => (
                                    <TextField
                                        fullWidth
                                        label="Conferma Password"
                                        type="password"
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
                        setOpenRegisterModal(false); 
                        reset();
                        setIsError(false);
                    }}>Chiudi</Button>
                    <Button variant="contained" type="submit">Invia</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default RegisterModal;