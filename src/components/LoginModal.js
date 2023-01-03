import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import useAuthActions from "../services/useAuthActions";
import { GlobalContext } from "../contexts/GlobalContext";

const LoginModal = () => {
    const { openLoginModal, setOpenLoginModal, setOpenRegisterModal } = useContext(GlobalContext);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const authActions = useAuthActions();

    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("obbligatorio"),
        password: Yup.string().required("obbligatorio")
    })

    const { handleSubmit, control, reset } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (values) => {
        let isAuthenticated = await authActions.login(values);
        setIsError(!isAuthenticated);
        if(isAuthenticated) {
            navigate("/user");
            setOpenLoginModal(false);
            reset();
        }
    }

    return (
        <Dialog open={openLoginModal}>
            <DialogTitle>
                Inserisci le credenziali!
            </DialogTitle>
            <form style={{width: "400px"}} onSubmit={ handleSubmit(onSubmit) }>
                <DialogContent>
                    <Grid container spacing={2}>
                        {isError ?
                            <Grid item xs={12}>
                                <Typography color="error">
                                    Credenziali errate! Riprova<br/>
                                    (se non sei registrato, <span 
                                        style={{color: "blue", textDecoration: "underline", cursor: "pointer"}} 
                                        onClick={() => {
                                            setOpenLoginModal(false);
                                            setOpenRegisterModal(true);
                                            setIsError(false);
                                            reset();
                                        }}>
                                        Registrati
                                    </span>.)
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
                    </Grid>
                </DialogContent>
                <DialogActions style={{ justifyContent: "space-between" }}>
                    <Button variant="outlined" onClick={() => { 
                        setOpenLoginModal(false); 
                        reset();
                        setIsError(false);
                    }}>Chiudi</Button>
                    <Button variant="contained" type="submit">Invia</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default LoginModal;