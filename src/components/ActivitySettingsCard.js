import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TimeSelector from './TimeSelector';
import DaySelector from './DaySelector'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ fontSize: 21 }} color="text.secondary" gutterBottom>
          Let's go for a walk!
        </Typography>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2}>
         <DaySelector/>
        </Grid>
        <Grid item xs={2}>
          <TimeSelector/>
        </Grid>
      </Grid>
      <Button style={{ marginLeft: "auto" }}>Done</Button>
    </Box>
  );
}
