import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import { getProjectNames } from "../../api/projects";
import { Timelog } from "../../models/timelog";


export default function AddNewLogModal() {
    const [timelogData, setTimeLogData] = useState<Timelog>();
    const [date, setDate] = useState(new Date());
    const [projectNames, setProjectNames] = useState<string[]>([]);    


    useEffect( () => {getProjectNames().then( (projectNames) => {setProjectNames(projectNames)})});

  
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeLogData(timelogData);
        console.log(event);
    };

    const handleDateChange = (selectedDate: Date) => {
        setDate(selectedDate);
    };

    const submitNewProject = (event: React.FormEvent) => {
        event.preventDefault();
        // submit the form here, using the name and date values
        console.log("submit data");

        if(timelogData?.description.trim() == ""){
            console.log("Description can't be empty");
        }

        const now = new Date();

        if(date < now){
            console.log("Name can't be empty");
        }

    };

    return (   
        <>
            <h3> Add New Log/Task</h3>
            {projectNames}

            <form onSubmit={submitNewProject}>
                <label htmlFor="name"> Select Project: 
                    <input type="text" id="project" className="input-style" onChange={handleNameChange}></input>
                </label>
                <br />
                <label htmlFor="name"> Task Description: 
                    <input type="text" id="description" className="input-style" onChange={handleNameChange}></input>
                </label>
                <br />
                <br />
                <label htmlFor="deadline"> Start Time: 
                    <DatePicker className="datepicker-style" name="start-time" value={date} onChange={handleDateChange} />
                </label>
                <br />
                <label htmlFor="deadline"> End Time: 
                    <DatePicker className="datepicker-style" name="end-time" value={date} onChange={handleDateChange} />
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