import { useDraggable } from '@dnd-kit/core';
import { width } from '@mui/system';

const Draggable = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
        data: props.data
    });
    
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundColor: "inherit",
        borderRadius: "5px",
        padding: "0px 30px 0px 30px",
        touchAction: "none"
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </div>
    );
}

export default Draggable;