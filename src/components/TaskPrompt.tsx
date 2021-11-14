import React from "react";
import { Stack, Button, Typography } from '@mui/material';
import { SingleTaskModel } from "../models/singleTask";

interface TaskPromptProps {
    task?: SingleTaskModel;
}

const TaskPrompt: React.FC<TaskPromptProps> = (props: TaskPromptProps) => {
    return (
        <div>
            <h1>{props.task && props.task.task}</h1>
            <Typography variant="body1">time: {props.task && props.task.nextTime.toDate().toLocaleTimeString()}</Typography>
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
