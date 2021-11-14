import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';

export default function DaySelector() {

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((v, k) => {
            return (
              <ListItem
                key={k}
                disablePadding
              >
                <Chip label={`${days[v]}`} />
              </ListItem>
            );
          })}
      </List>
  );
}
