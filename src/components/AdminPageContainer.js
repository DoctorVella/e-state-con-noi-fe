import { Box, Typography } from "@mui/material";

const AdminPageContainer = ({children}) => {

    return (
        <>
            <Box sx={{ p: 3 }}>
              <Box sx={{ pb: 3 }}>
                <Typography variant='title'>E...STATE CON NOI</Typography>
                <Typography variant='h2'>parrocchia Santa Fara</Typography>
              </Box> 
              {children}
            </Box>
        </>
    );
}

export default AdminPageContainer;