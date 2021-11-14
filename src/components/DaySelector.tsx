import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';

interface DaySelectorProps {
  d: [string, React.Dispatch<React.SetStateAction<string>>];
}

const DaySelector: React.FC<DaySelectorProps> = (props: DaySelectorProps) => {
  const [day, setDay] = props.d;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {days.map((v, k) => {
        return (
          <ListItem
            key={k}
          >
            <Chip
              label={v}
              color={day === v ? "primary" : "default"}
              onClick={() => setDay(v)}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default DaySelector;
