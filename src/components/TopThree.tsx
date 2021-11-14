import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { SingleTaskModel } from "../models/singleTask";

interface TopThreeProps {
  data?: SingleTaskModel[];
  setActiveTask: (a: SingleTaskModel) => void;
}

const TopThree: React.FC<TopThreeProps> = (props: TopThreeProps) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'white', borderRadius: '16px' }}>
      {props.data && props.data.slice(0, 3).map((v, k) => {
        return (
          <ListItem key={k} onClick={() => props.setActiveTask(v)}>
            <ListItemButton>
              <ListItemText primary={v.task} />
            </ListItemButton>
          </ListItem>
        )
      }
      )}
    </List>
  );

};

export default TopThree;
