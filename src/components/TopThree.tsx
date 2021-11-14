import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";

function TopThree(){
const top_three = ["Let's Take a Walk!", "Grab a Drink of Water.", "Say Hi to //TODO"]

    return(
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'white', borderRadius: '16px'}}>
            {top_three.map((v,k)=>{
                return(<ListItem key={k}>
                    <ListItemText primary = {v} />
                </ListItem>)
            }
            )}
        </List>
    );

};

export default TopThree;