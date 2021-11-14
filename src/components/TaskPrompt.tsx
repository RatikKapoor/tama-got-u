import React from "react";
import { useDispatch } from "react-redux";
import { incrementHappiness } from "../features/pet/petSlice";
import { Stack, Button, Typography } from '@mui/material';
import { SingleTaskModel } from "../models/singleTask";

interface TaskPromptProps {
    task?: SingleTaskModel;
    removeActivityFromUser: (x: SingleTaskModel) => void;
}

const TaskPrompt: React.FC<TaskPromptProps> = (props: TaskPromptProps) => {
    const dispatch = useDispatch();

    const removeSelf = () => {
        props.removeActivityFromUser(props.task);
    }

    const onDoneTask = () => {
        dispatch(incrementHappiness());
        removeSelf();
    }

    return (
        <div>
            <h1>{props.task && props.task.task}</h1>
            <Typography variant="body1">time: {props.task && props.task.nextTime && props.task.nextTime.toDate().toLocaleTimeString()}</Typography>
            <Stack spacing={2} direction="row">
                {/* <Button variant="outlined" onClick={() => {
                    alert('Here we should open the event editor!');
                }}>Edit</Button> */}
                <Button variant="outlined" onClick={removeSelf}>Dismiss</Button>
                <Button variant="outlined" onClick={onDoneTask}>✓ Done</Button>
            </Stack>
        </div>
    );
}

export default TaskPrompt;
