import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import useAuthActions from "../services/useAuthActions";

const LoginModal = () => {
    const { openLoginModal, setOpenLoginModal } = useContext(AuthContext);
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

    const { handleSubmit, control } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = (values) => {
        console.log(values);
        authActions.login(values);
        setOpenLoginModal(false);
        navigate("/user");
    }

    return (
        <Dialog open={openLoginModal}>
            <DialogTitle>
                Inserisci le credenziali!
            </DialogTitle>
            <form>
                <DialogContent>
                    <Grid container spacing={2}>
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
                    <Button variant="outlined" onClick={() => { setOpenLoginModal(false); }}>Chiudi</Button>
                    <Button variant="contained" onClick={handleSubmit(onSubmit)}>Invia</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default LoginModal;