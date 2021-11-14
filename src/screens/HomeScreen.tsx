import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Firestore from '../api/firestore';
import ActivitySettingsModal from '../components/ActivitySettingsModal';
import TaskList from '../components/TaskList';
import TaskPrompt from '../components/TaskPrompt';
import TopThree from '../components/TopThree';
import { SingleTaskModel } from '../models/singleTask';
import { UserModel } from '../models/user';
import _ from "lodash";
import "./HomeScreen.css"

interface HomeScreenProps {
  user?: UserModel;
  firestore?: Firestore;
  updateUser: (u: UserModel) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
  const [showTaskList, setShowTaskList] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<SingleTaskModel | undefined>();
  const [showActivitySettingsModal, setShowActivitySettingsModal] = useState<boolean>(false);
  const [activitySettingsModalTask, setActivitySettingsModalTask] = useState<SingleTaskModel | undefined>();

  useEffect(() => {
    if (!props.user) return;
    setActiveTask(props.user["preferred-activities"][0]);
  }, [props, props.user])

  const setAndShowActivitySettingsModal = (a: SingleTaskModel) => {
    setShowActivitySettingsModal(true);
    setActivitySettingsModalTask(a);
  }

  const updateUserWithNewActivity = (newActivity: SingleTaskModel, oldTaskName: string) => {
    let newUser: UserModel = _.cloneDeep(props.user);
    newUser['preferred-activities'][newUser['preferred-activities'].findIndex(x => x.task === oldTaskName)] = newActivity;
    props.updateUser(newUser)
    props.firestore.updateUser(newUser);
  }

  const removeActivityFromUser = (toRemoveActivity: SingleTaskModel) => {
    let newUser: UserModel = _.cloneDeep(props.user);
    newUser['preferred-activities'] = newUser['preferred-activities'].filter(x => x.task !== toRemoveActivity.task);
    props.updateUser(newUser);
    props.firestore.updateUser(newUser);
  }

  const toggleShowTaskList = () => setShowTaskList(!showTaskList);

  return (
    <div className="overlay-div">
      <Button variant="outlined" href = "#Button" onClick={toggleShowTaskList}>
        {showTaskList ? "Back" : "Show Tasks"}
      </Button>
      {(props.user && props.user['preferred-activities']) &&
        (showTaskList ?
          <TaskList
            data={props.user["preferred-activities"]}
            setAndShowActivitySettingsModal={setAndShowActivitySettingsModal}
          />
          :
          <TopThree
            data={props.user["preferred-activities"]}
            setActiveTask={setActiveTask}
          />)
      }
      <TaskPrompt task={activeTask} removeActivityFromUser={removeActivityFromUser} />
      <ActivitySettingsModal
        show={showActivitySettingsModal}
        task={activitySettingsModalTask}
        setShowActivitySettingsModal={setShowActivitySettingsModal}
        updateActivity={updateUserWithNewActivity}
      />
    </div>
  )
}

export default HomeScreen;
