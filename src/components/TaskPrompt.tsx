import React from "react";
import { Stack, Button, Typography } from '@mui/material';

function PrintTaskTime(props) {
    return <Typography variant="body1">time: {props.time}</Typography>;
}

function TaskPrompt() {
    return (
        <div>
            <h1>Let's take a walk!</h1>
            <PrintTaskTime time="3:00pm" />
            <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={() => {
                    alert('Here we should open the event editor!');
                }}>Edit</Button>
                <Button variant="outlined" onClick={() => {
                    alert('Here we should increase totoros happiness!');
                }}>✓ Done</Button>
                <Button variant="outlined" onClick={() => {
                    alert('Here we should remove the item from the DB!')
                }}>Dismiss</Button>
            </Stack>
        </div>
    );
}

export default TaskPrompt;
