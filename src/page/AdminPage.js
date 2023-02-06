import { Info } from "@mui/icons-material";
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import usePlayerActions from "../services/usePlayerActions";

const AdminPage = () => {
    const { findPlayer } = usePlayerActions();
    const [players, setPlayers] = useState([]);
    const [shownPlayers, setShownPlayers] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const fetchPlayers = async () => {
        let res = await findPlayer();
        if (res) {
            setPlayers(res);
            setShownPlayers(res);
        }
    }

    useEffect(() => {
        fetchPlayers();
    }, [])

    useEffect(() => {
        setShownPlayers(players.filter(p => (p.name + " " + p.surname).includes(searchInput)))
    },[searchInput])

 //TODO passa a DataGrid

    return (
        <>
            <Grid container rowSpacing={2} columnSpacing={5}>
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={8} >
                    <TextField 
                        fullWidth
                        variant="outlined"
                        label="Cerca..."
                        value={searchInput}
                        onChange={(e) => {setSearchInput(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={0} md={2} />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Età</TableCell>
                                    <TableCell>Squadra</TableCell>
                                    <TableCell>Azioni</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {shownPlayers && shownPlayers.length > 0 ?
                                    shownPlayers?.map((p) => (
                                        <TableRow key={p._id}>
                                            <TableCell>{p.name} {p.surname}</TableCell>
                                            <TableCell>{p.age}</TableCell>
                                            <TableCell>{p.team ? p.team : "N/A"}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary"><Info/></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )) : <TableRow>
                                        <TableCell>Nessun giocatore trovato</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={0} md={2} />
            </Grid>
        </>
    );
}

export default AdminPage;