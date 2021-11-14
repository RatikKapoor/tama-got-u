import React from "react";
import { Stack, Button, Typography } from '@mui/material';

function PrintTaskTime(props) {
    return <Typography variant="body1">time, {props.time}</Typography>;
}

function TaskPrompt() {
    return (
        <div>
            <h1>Let's take a walk!</h1>
            <PrintTaskTime time="3:00pm" />
            <Stack spacing={2} direction="row">
                <Button variant="outlined">Edit</Button>
                <Button variant="outlined">✓ Done</Button>
                <Button variant="outlined">Dismiss</Button>
            </Stack>
        </div>
    );
}

export default TaskPrompt;
