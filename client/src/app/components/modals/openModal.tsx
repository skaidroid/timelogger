import { useState } from "react";

export default function openModal() {
  const [isProjectModOpen, setisOpen] = useState(false);
  const [isTaskModOpen, setisTaskModOpen] = useState(false);


  //Opening and closing modals for adding new projects and logs/tasks
  const toggleProjectMod = () => {
    setisOpen(!isProjectModOpen);
  };

  const toggleTaskMod = () => {
    setisTaskModOpen(!isTaskModOpen);
  };

  return {
    isProjectModOpen,
    toggleProjectMod,
    isTaskModOpen,
    toggleTaskMod
  };
}
