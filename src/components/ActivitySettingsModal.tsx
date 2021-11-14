import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TimeSelector from './TimeSelector';
import DaySelector from './DaySelector'
import Button from '@mui/material/Button';
import { Modal, Typography } from '@mui/material';
import { SingleTaskModel } from '../models/singleTask';
import { Timestamp } from '@firebase/firestore';

interface ActivitySettingsModalProps {
  task?: SingleTaskModel;
  show: boolean;
  setShowActivitySettingsModal: (x: boolean) => void;
  updateActivity: (a: SingleTaskModel, o: string) => void;
}

const ActivitySettingsModal: React.FC<ActivitySettingsModalProps> = (props: ActivitySettingsModalProps) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [day, setDay] = useState("Monday")
  const [time, setTime] = useState(new Date('2014-08-18T21:11:54'));

  const updateTaskData = () => {
    const newTask: SingleTaskModel = {
      task: taskTitle,
      nextTime: Timestamp.fromDate(time)
    }
    props.updateActivity(newTask, props.task.task);
    props.setShowActivitySettingsModal(false);
  }

  useEffect(() => {
    setTaskTitle(props.task && props.task.task);
    setTime(props.task && props.task.nextTime.toDate())
  }, [props.task])

  return (
    <Modal open={props.show} onClose={() => props.setShowActivitySettingsModal(false)}>
      <Box sx={{ background: "red" }}>
        <Typography sx={{ fontSize: 21 }} color="text.secondary" gutterBottom>
          {taskTitle}
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={2}>
            <DaySelector d={[day, setDay]} />
          </Grid>
          <Grid item xs={2}>
            <TimeSelector t={[time, setTime]} />
          </Grid>
        </Grid>
        <Button
          style={{ marginLeft: "auto" }}
          onClick={() => props.setShowActivitySettingsModal(false)}
        >
          Cancel
        </Button>
        <Button
          style={{ marginLeft: "auto" }}
          onClick={updateTaskData}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}

export default ActivitySettingsModal;
