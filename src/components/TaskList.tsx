import React from "react";
import { List } from "@mui/material";
import SingleTask from "./SingleTask";
import { SingleTaskModel } from "../models/singleTask";

interface TaskListProps {
  data: SingleTaskModel[];
  setAndShowActivitySettingsModal: (x: SingleTaskModel) => void;
}

const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
  return (
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
  );
};

export default TaskList;
