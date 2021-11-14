import React from "react";
import { Stack, Button, Typography } from '@mui/material';

function PrintTaskTime(props) {
    return <Typography variant="body1">time: {props.time}</Typography>;
}

function PrintTaskTitle(props){
    return <h1>{props.title}</h1>;
}

function TaskPrompt() {
    return (
        <div>
            <PrintTaskTitle title="Task Title" />
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
