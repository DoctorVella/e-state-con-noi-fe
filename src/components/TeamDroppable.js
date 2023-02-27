import {useDroppable} from '@dnd-kit/core';
import { Paper, Typography } from '@mui/material';
import { NOT_ASSIGNED_TEAM_NAME } from '../util/Constants';
import { getTeamColors } from '../util/MuiTheme';
import Draggable from './Draggable';

const TeamDroppable = ({name,players}) => {
    const {setNodeRef} = useDroppable({id: name});

    return (name === NOT_ASSIGNED_TEAM_NAME ?
        (players?.length > 0 ? 
            <Paper ref={setNodeRef} elevation={2} sx={{backgroundColor: getTeamColors(name)}}>
                <Typography color="black" variant="h6">{name} ({players ? players.length : 0})</Typography>
                {players?.map(p => (
                    <Draggable key={p._id} id={p._id} data={name}>
                        <Typography color="black">{p.name} {p.surname} {p.age}</Typography>
                    </Draggable>
                ))}
            </Paper> : null) : 
        <Paper ref={setNodeRef} elevation={2} sx={{backgroundColor: getTeamColors(name)}}>
            <Typography color="black" variant="h6">{name} ({players ? players.length : 0})</Typography>
            {players?.map(p => (
                <Draggable key={p._id} id={p._id} data={name}>
                    <Typography color="black">{p.name} {p.surname} {p.age}</Typography>
                </Draggable>
            ))}
        </Paper>
    );
}

export default TeamDroppable;