import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { SingleTaskProps } from "./SingleTask";

interface TopThreeProps {
    data?: SingleTaskProps[];
}

const TopThree: React.FC<TopThreeProps> = (props: TopThreeProps) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'white', borderRadius: '16px' }}>
            {props.data && props.data.slice(0, 3).map((v, k) => {
                return (<ListItem key={k}>
                    <ListItemText primary={v.task} />
                </ListItem>)
            }
            )}
        </List>
    );

};

export default TopThree;
