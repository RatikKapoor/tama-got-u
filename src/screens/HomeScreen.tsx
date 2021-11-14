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
import { Timestamp } from '@firebase/firestore';

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

  const resetDb = () => {
    const activityList: SingleTaskModel[] = [
      {
        nextTime: Timestamp.fromDate(new Date(1636851600000)),
        task: "Read a book for 10 minutes"
      },
      {
        nextTime: Timestamp.fromDate(new Date(1636866000000)),
        task: "Finish a workout"
      },
      {
        nextTime: Timestamp.fromDate(new Date(1636930800000)),
        task: "Play with my dog"
      },
      {
        nextTime: Timestamp.fromDate(new Date(1637006400000)),
        task: "Practice mindfulness"
      },
      {
        nextTime: Timestamp.fromDate(new Date(1637514000000)),
        task: "Take dog on walk"
      },
      {
        nextTime: Timestamp.fromDate(new Date(1637521200000)),
        task: "Call a family member"
      },
      {
        nextTime: Timestamp.fromDate(new Date(1637787600000)),
        task: "Do house chores"
      },
      {
        nextTime: Timestamp.fromDate(new Date(1637794800000)),
        task: "Watch TV"
      },
      {
        nextTime: Timestamp.fromDate(new Date(1638309600000)),
        task: "Eat a healthy snack"
      },
    ]
    let newUser = _.cloneDeep(props.user);
    newUser["preferred-activities"] = activityList;
    props.updateUser(newUser);
    props.firestore.updateUser(newUser);
  }

  const toggleShowTaskList = () => setShowTaskList(!showTaskList);

  return (
    <div className="overlay-div">
      <div className="container-div">
        <div className="top-section">
          <Button
            variant="outlined" style={
              {
                color: '#000',
                borderColor: '#000',
                borderBlockWidth: 2,
                margin: 4
              }
            } onClick={toggleShowTaskList}
            className="toggle-button"
          >
            {showTaskList ? "Back" : "Show Tasks"}
          </Button>
          {(props.user && props.user['preferred-activities']) &&
            (showTaskList ?
              <TaskList
                data={props.user["preferred-activities"]}
                setAndShowActivitySettingsModal={setAndShowActivitySettingsModal}
                resetDb={resetDb}
              />
              :
              <TopThree
                data={props.user["preferred-activities"]}
                setActiveTask={setActiveTask}
              />)
          }
        </div>
        <div className="bottom-section">
          <div className="bottom-section-inner">
            <TaskPrompt task={activeTask} removeActivityFromUser={removeActivityFromUser} />
          </div>
        </div>
        <ActivitySettingsModal
          show={showActivitySettingsModal}
          task={activitySettingsModalTask}
          setShowActivitySettingsModal={setShowActivitySettingsModal}
          updateActivity={updateUserWithNewActivity}
        />
      </div>
    </div>
  )
}

export default HomeScreen;
