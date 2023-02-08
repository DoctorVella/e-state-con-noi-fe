import { Info } from "@mui/icons-material";
import { Grid, IconButton, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import usePlayerActions from "../services/usePlayerActions";
import { DataGrid } from "@mui/x-data-grid";

const AdminPage = () => {
    const { findPlayer } = usePlayerActions();
    const [players, setPlayers] = useState([]);
    const [shownPlayers, setShownPlayers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

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

    const mdColumns = [
        {
            field: "name",
            headerName: "Nome",
            valueGetter: (params) => {return params.row.name + " " + params.row.surname},
            flex: 2
        },
        {
            field: "age",
            headerName: "Età",
            flex: 1
        },
        {
            field: "team",
            headerName: "Squadra",
            valueGetter: (params) => {return params.row.team ? params.row.team : "N/A"},
            flex: 1
        },
        {
            field: "action",
            headerName: "Azioni",
            renderCell: (params) => {return <IconButton color="primary"><Info/></IconButton>},
            flex: 1
        }
    ]

    const xsColumns = [
        {
            field: "name",
            headerName: "Nome",
            valueGetter: (params) => {return params.row.name + " " + params.row.surname},
            flex: 2
        },
        {
            field: "action",
            headerName: "Azioni",
            renderCell: (params) => {return <IconButton color="primary"><Info/></IconButton>},
            flex: 1
        }
    ]

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
                    <DataGrid 
                        columns={isLargeScreen ? mdColumns : xsColumns}
                        rows={shownPlayers}
                        getRowId={r => r._id}
                        autoHeight
                        localeText={{
                            noRowsLabel: 'Nessun Giocatore Trovato',
                            labelRowsPerPage: 'test'
                        }}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => {setPageSize(newPageSize)}}
                        rowsPerPageOptions={[5,10,20]}
                        componentsProps={{
                            pagination: {
                              labelRowsPerPage: "Righe per pagina",
                              labelDisplayedRows: (({from,to,count,page}) => {return from + "-" + to + " di " + count})
                            }
                        }}
                        />
                </Grid>
                <Grid item xs={0} md={2} />
            </Grid>
        </>
    );
}

export default AdminPage;