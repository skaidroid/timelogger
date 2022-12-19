import React, { useState, useEffect } from "react";
// import Dropdown from '../dropdown/Dropdown';
import DateTimePicker from 'react-datetime-picker';
import { getActiveProjectNames } from "../../api/projects";
import { addNewTimelog } from "../../api/timelogs";
import { ActiveProjects } from "../../models/activeProjects";


export default function AddNewLogModal() {
    // const options = ['Option 1', 'Option 2', 'Option 3'];

    // const [timelogData, setTimeLogData] = useState<Timelog>();
    // const [date, setDate] = useState(new Date());
    const [projectNames, setProjectNames] = useState<ActiveProjects[]>([]);    
    const [selectedId] = useState<string>();

    
    const [stateTimelog, setTimelogState] = useState({
        projectId: -1,
        description: "",
        startTime: new Date(),
        endTime: new Date()
        
    });
    useEffect( () => {getActiveProjectNames().then( (projectNames) => {setProjectNames(projectNames)})}, []);
  
    const handleChange = (dataName: string, dataValue : Date|string|number) => {
        setTimelogState({
            ...stateTimelog,
            [dataName]: dataValue
          });
    };

    const submitNewProject = (event: React.FormEvent) => {
        event.preventDefault();
        // submit the form here, using the name and date values
        // console.log("submit data", {projectNames});

        if(stateTimelog?.description.trim() == ""){
            console.log("Description can't be empty");
        }

        console.log(stateTimelog)

        // const now = new Date();

        // if(state.endTime < now){
        //     console.log("Name can't be empty");
        // }
        addNewTimelog(stateTimelog);

    };

    return (   
        <>
            <h3> Add New Log/Task</h3>

            <form onSubmit={submitNewProject}>


            <div>
                <label htmlFor="dropdown">Select project:</label>
                {/* handleChange("project",  e.target.value) */}
                    <select id="dropdown" value={selectedId} onChange={(e:  React.ChangeEvent<HTMLSelectElement>) => handleChange("projectId",  Number(e.target.value))}>
                        {projectNames.map(project => (
                            <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
            </select>
            </div>
                {/* <Dropdown items={projectNames} /> */}
           
                <br />
                <label htmlFor="name"> Task Description: 
                    <input type="text" id="description" name="description" className="input-style" onChange={(e:  React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.name,  e.target.value)}></input>
                </label>
                <br />
                <br />
                <label htmlFor="deadline"> Start Time: 
                    <DateTimePicker className="datepicker-style" name="startTime" value={stateTimelog.startTime} onChange={(value : Date) => handleChange("startTime",  value)} />
                </label>
                <br />
                <label htmlFor="deadline"> End Time: 
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