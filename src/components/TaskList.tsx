import React from "react";
import { List } from "@mui/material";
import SingleTask from "./SingleTask";
import { SingleTaskModel } from "../models/singleTask";

interface TaskListProps {
  data: SingleTaskModel[];
}

const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
  return (
    <List>
      {props.data &&
        props.data.map((v, k) => {
          return <SingleTask key={k} task={v.task} nextTime={v.nextTime} />;
        })}
    </List>
  );
};

export default TaskList;
