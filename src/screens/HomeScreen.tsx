import { Button } from '@mui/material';
import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskPrompt from '../components/TaskPrompt';
import TopThree from '../components/TopThree';
import ActivitySettingsCard from "../components/ActivitySettingsCard";
import { UserModel } from '../models/user';
import "./HomeScreen.css"

interface HomeScreenProps {
  user?: UserModel;
}

const HomeScreen: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
  const [showTaskList, setShowTaskList] = useState<boolean>(false);

  const toggleShowTaskList = () => setShowTaskList(!showTaskList);

  return (
    <div className="overlay-div">
      <Button onClick={toggleShowTaskList}>
        Show Tasks
      </Button>
      {
        showTaskList ?
          <TaskList data={props.user && props.user["preferred-activities"]} />
          :
          <TopThree data={props.user && props.user["preferred-activities"]} />
      }
      <TaskPrompt />
      <ActivitySettingsCard />
    </div>
  )
}

export default HomeScreen;
