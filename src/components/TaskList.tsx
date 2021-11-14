import React from "react";
import { List, Paper } from "@mui/material";
import SingleTask from "./SingleTask";
import { SingleTaskModel } from "../models/singleTask";

interface TaskListProps {
  data: SingleTaskModel[];
  setAndShowActivitySettingsModal: (x: SingleTaskModel) => void;
}

const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
  return (
    <Paper style={{maxHeight: 300, overflow: 'auto'}}>
    <List>
      {props.data &&
        props.data.map((v, k) => {
          return <SingleTask
            key={k}
            task={v}
            setAndShowActivitySettingsModal={props.setAndShowActivitySettingsModal}
          />;
        })}
    </List>
    </Paper>

  );
};

export default TaskList;
