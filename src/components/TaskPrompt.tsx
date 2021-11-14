import React from "react";
import { useDispatch } from "react-redux";
import { incrementHappiness, decrementHappiness } from "../features/pet/petSlice";
import { Stack, Button, Typography } from '@mui/material';
import { SingleTaskModel } from "../models/singleTask";
import "./TaskPrompt.css"

interface TaskPromptProps {
    task?: SingleTaskModel;
    removeActivityFromUser: (x: SingleTaskModel) => void;
}

const TaskPrompt: React.FC<TaskPromptProps> = (props: TaskPromptProps) => {
    const dispatch = useDispatch();

    const onDismissTask = () => {
        dispatch(decrementHappiness())
        removeSelf();
    }

    const removeSelf = () => {
        props.removeActivityFromUser(props.task);
    }

    const onDoneTask = () => {
        dispatch(incrementHappiness());
        removeSelf();
    }

    return (
        <div className="task-prompt">
            <h1 className="white-text">Task: {props.task && props.task.task}</h1>
            <Typography variant="body1" className="white-text prompt-time">
                Time: {props.task && props.task.nextTime && props.task.nextTime.toDate().toLocaleTimeString()}
            </Typography>
            <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={removeSelf} style={{ color: '#FFFFFF', borderColor: '#FFFFFF', borderBlockWidth: 2 }}>Dismiss</Button>
                <Button variant="outlined" onClick={onDoneTask} style={{ color: '#FFFFFF', borderColor: '#FFFFFF', borderBlockWidth: 2 }}>✓ Done</Button>
            </Stack>
        </div>
    );
}

export default TaskPrompt;
