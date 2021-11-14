import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';

interface DaySelectorProps {
  d: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}

const DaySelector: React.FC<DaySelectorProps> = (props: DaySelectorProps) => {
  const [daysState, setDaysState] = props.d;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const updateDays = (d: string) => {
    if (daysState.includes(d)) {
      setDaysState(daysState.filter(x => x !== d));
    }
    else {
      setDaysState([...daysState, d]);
    }
  }

  return (
    <List dense sx={{ bgcolor: 'background.paper' }}>
      {daysState && days.map((v, k) => {
        return (
          <ListItem
            key={k}
          >
            <Chip
              label={v}
              color={daysState.includes(v) ? "primary" : "default"}
              onClick={() => updateDays(v)}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default DaySelector;
