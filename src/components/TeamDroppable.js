import {useDroppable} from '@dnd-kit/core';
import { Paper, Typography } from '@mui/material';
import { getTeamColors } from '../util/MuiTheme';
import Draggable from './Draggable';

const TeamDroppable = ({name,players}) => {
    const {setNodeRef} = useDroppable({id: name,});

    return (<Paper ref={setNodeRef} elevation={2} sx={{backgroundColor: getTeamColors(name)}}>
        <Typography color="black" variant="h6">{name}</Typography>
        {players?.map(p => (
            <Draggable key={p._id} id={p._id}>
                <Typography color="black">{p.name} {p.surname} {p.age}</Typography>
            </Draggable>
        ))}
    </Paper>);
}

export default TeamDroppable;