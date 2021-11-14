import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { Firestore, Timestamp } from "@firebase/firestore";

/*
props: {
    task: string;
    nextTime: string;
    lastCompleted: string;
}
*/

export interface SingleTaskProps {
  task: string;
  nextTime: Timestamp;
  lastCompleted?: Timestamp;
}

const SingleTask: React.FC<SingleTaskProps> = (props: SingleTaskProps) => {
  return (
    <>
      <ListItem>
        <ListItemText
          primary={props.task}
          secondary={props.nextTime.toDate().toLocaleTimeString()}
        />
      </ListItem>
    </>
  );
};

export default SingleTask;
