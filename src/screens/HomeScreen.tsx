import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ActivitySettingsModal from '../components/ActivitySettingsModal';
import TaskList from '../components/TaskList';
import TaskPrompt from '../components/TaskPrompt';
import TopThree from '../components/TopThree';
import { SingleTaskModel } from '../models/singleTask';
import { UserModel } from '../models/user';
import "./HomeScreen.css"

interface HomeScreenProps {
  user?: UserModel;
}

const HomeScreen: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
  const [showTaskList, setShowTaskList] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<SingleTaskModel | undefined>();
  const [showActivitySettingsModal, setShowActivitySettingsModal] = useState<boolean>(false);
  const [activitySettingsModalTask, setActivitySettingsModalTask] = useState<SingleTaskModel | undefined>();

  useEffect(() => {
    if (!props.user) return;
    setActiveTask(props.user["preferred-activities"][0]);
  }, [props])

  const setAndShowActivitySettingsModal = (a: SingleTaskModel) => {
    setShowActivitySettingsModal(true);
    setActivitySettingsModalTask(a);
  }

  const toggleShowTaskList = () => setShowTaskList(!showTaskList);

  return (
    <div className="overlay-div">
      <Button onClick={toggleShowTaskList}>
        {showTaskList ? "Back" : "Show Tasks"}
      </Button>
      {
        showTaskList ?
          <TaskList
            data={props.user && props.user["preferred-activities"]}
            setAndShowActivitySettingsModal={setAndShowActivitySettingsModal}
          />
          :
          <TopThree
            data={props.user && props.user["preferred-activities"]}
            setActiveTask={setActiveTask}
          />
      }
      <TaskPrompt task={activeTask} />
      <ActivitySettingsModal
        show={showActivitySettingsModal}
        task={activitySettingsModalTask}
        setShowActivitySettingsModal={setShowActivitySettingsModal}
      />
    </div>
  )
}

export default HomeScreen;
