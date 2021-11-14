import React from "react";
import { ListItem, ListItemText, ListItemButton } from "@mui/material";
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
      <ListItemButton>
      <ListItemText
        primary={props.task.task}
        secondary={props.task.nextTime.toDate().toLocaleTimeString()}
      />
      </ListItemButton>
    </ListItem>
  );
};

export default SingleTask;
