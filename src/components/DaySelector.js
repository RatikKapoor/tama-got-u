import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';

export default function DaySelector() {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((v, k) => {
            const labelId = `checkbox-list-secondary-label-${v}`;
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

// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';

// import Stack from '@mui/material/Stack';

// export default function AvatarChips() {
//   return (
//     <Stack direction="row" spacing={1}>
//       <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
//       <Chip
//         avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
//         label="Avatar"
//         variant="outlined"
//       />
//     </Stack>
//   );
// }
