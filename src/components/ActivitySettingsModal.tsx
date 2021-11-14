import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TimeSelector from './TimeSelector';
import DaySelector from './DaySelector'
import Button from '@mui/material/Button';
import { Modal, Typography } from '@mui/material';
import { SingleTaskModel } from '../models/singleTask';
import { Timestamp } from '@firebase/firestore';
import "./ActivitySettingsModal.css"

interface ActivitySettingsModalProps {
  task?: SingleTaskModel;
  show: boolean;
  setShowActivitySettingsModal: (x: boolean) => void;
  updateActivity: (a: SingleTaskModel, o: string) => void;
}

const ActivitySettingsModal: React.FC<ActivitySettingsModalProps> = (props: ActivitySettingsModalProps) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [days, setDays] = useState<string[]>(["Monday"])
  const [time, setTime] = useState(new Date('2014-08-18T21:11:54'));

  const updateTaskData = () => {
    const newTask: SingleTaskModel = {
      task: taskTitle,
      nextTime: Timestamp.fromDate(time),
      days: days
    }
    props.updateActivity(newTask, props.task.task);
    props.setShowActivitySettingsModal(false);
  }

  useEffect(() => {
    setTaskTitle(props.task && props.task.task);
    setTime(props.task && props.task.nextTime.toDate())
    setDays(props.task && props.task.days);
  }, [props.task])

  return (
    <Modal open={props.show} onClose={() => props.setShowActivitySettingsModal(false)}>
      <Box sx={{ background: "#ffffff" }}>
        <div className="activity-settings-container">
          <Typography sx={{ fontSize: 30, paddingLeft: 6 }} color="text.primary" gutterBottom>
            {taskTitle}
          </Typography>
          <div className="inner-container">
            <DaySelector d={[days, setDays]} />
            <TimeSelector t={[time, setTime]} />
          </div>
          <div>
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
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ActivitySettingsModal;
