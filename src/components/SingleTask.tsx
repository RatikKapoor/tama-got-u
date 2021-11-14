import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { SingleTaskModel } from "../models/singleTask";

const SingleTask: React.FC<SingleTaskModel> = (props: SingleTaskModel) => {
  return (
    <>
      <ListItem sx={{ backgroundColor: "#fff", borderRadius: '16px', marginBottom: 1, alignSelf: 'center'}}>
        <ListItemText
          primary={props.task}
          secondary={props.nextTime.toDate().toLocaleTimeString()}
        />
      </ListItem>
    </>
  );
};

export default SingleTask;
