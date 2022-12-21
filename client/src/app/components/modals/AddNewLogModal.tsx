import React, { useState, useEffect } from "react";
import DateTimePicker from 'react-datetime-picker';
import { getActiveProjectNames } from "../../api/projects";
import { addNewTimelog } from "../../api/timelogs";
import { ActiveProjects } from "../../models/activeProjects";

interface ModalType {
    toggle: () => void;
}
export default function AddNewLogModal(modal : ModalType) {
    const [stateTimelog, setTimelogState] = useState({
        projectId: -1,
        description: "",
        startTime: new Date(),
        endTime: new Date()
    });
  

    const [projectNames, setProjectNames] = useState<ActiveProjects[]>([]);    
    const [selectedId] = useState<string>();

    useEffect( () => {getActiveProjectNames().then( (projectNames) => {setProjectNames(projectNames); handleChange('projectId', Number(projectNames[0].id));})}, []);
  

    const handleChange = (dataName: string, dataValue : Date|string|number) => {
        setTimelogState({
            ...stateTimelog,
            [dataName]: dataValue
          });
    };

    const submitNewTask = (event: React.FormEvent) => {
        event.preventDefault();

        if(stateTimelog.projectId == -1 ){
            handleChange('projectId', projectNames[0].id)
        }

        addNewTimelog(stateTimelog);
        modal.toggle();
        
    };

    return (   
        <>
            <h2> Add New Log/Task</h2>
            <form onSubmit={submitNewTask}>

            <div>
                <label htmlFor="dropdown"><b>Select project:</b></label>
                {/* handleChange("project",  e.target.value) */}
                    <select className="ml-3" id="dropdown" value={selectedId} onChange={(e:  React.ChangeEvent<HTMLSelectElement>) => handleChange("projectId",  Number(e.target.value))}>
                        {projectNames.map(project => (
                            <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
            </select>
            </div>           
                <br />
                <label htmlFor="name"> <b className="tetbox-lable">Task Description:</b>
                    <textarea id="description" name="description" className="input-textbox ml-4" onChange={(e:  React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.name,  e.target.value)}></textarea>
                </label>
                <br />
                <br />
                <label htmlFor="deadline"> <b>Start Time:</b> 
                    <DateTimePicker className="datepicker-style" name="startTime" value={stateTimelog.startTime} onChange={(value : Date) => handleChange("startTime",  value)} />
                </label>
                <br />
                <label htmlFor="deadline"> <b>End Time:</b> 
                    <DateTimePicker className="datepicker-style" name="endTime" value={stateTimelog.endTime} onChange={(value : Date) => handleChange("endTime",  value)} />
                </label>
                
                <br />
                <br />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New</button>
            </form>

            <div id="modal_errors" >

            </div>
  
        </>
    );
}