import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { SingleTaskModel } from "../models/singleTask";

interface SingleTaskProps {
  task: SingleTaskModel;
  setAndShowActivitySettingsModal: (x: SingleTaskModel) => void;
}

const SingleTask: React.FC<SingleTaskProps> = (props: SingleTaskProps) => {
  return (
    <ListItem
      sx={{ backgroundColor: "#fff", borderRadius: 10, marginBottom: 1 }}
      onClick={() => props.setAndShowActivitySettingsModal(props.task)}
    >
      <ListItemText
        primary={props.task.task}
        secondary={props.task.nextTime.toDate().toLocaleTimeString()}
      />
    </ListItem>
  );
};

export default SingleTask;
