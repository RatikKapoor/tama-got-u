import React from "react";
import { List } from "@mui/material";
import SingleTask, { SingleTaskProps } from "./SingleTask";

interface TaskListProps {
  data: SingleTaskProps[];
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
