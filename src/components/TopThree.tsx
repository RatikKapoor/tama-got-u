import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { SingleTaskModel } from "../models/singleTask";

interface TopThreeProps {
  data?: SingleTaskModel[];
  setActiveTask: (a: SingleTaskModel) => void;
}

const TopThree: React.FC<TopThreeProps> = (props: TopThreeProps) => {
  const [sliced, setSliced] = useState<SingleTaskModel[] | undefined>();

  useEffect(() => {
    if (!props.data) return;
    setSliced(props.data.slice(0, 3))
  }, [props, props.data])

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'white', borderRadius: '16px' }}>
      {sliced && sliced.map((v, k) => {
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
