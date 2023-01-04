import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { addProject } from "../../api/projects";
import { Project } from "../../models/project";

interface ModalType {
    toggle: () => void;
    proj: (value: Project[]) => void
  }
export default function AddProjectModal(modal : ModalType) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
  
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDateChange = (selectedDate: Date) => {
        setDate(selectedDate);
    };

    const submitNewProject = (event: React.FormEvent) => {
        event.preventDefault();
        // submit the form here, using the name and date values
        if(name.length == 0){
            setErrorMessage("Name can't be empty.");
        } else if(date < (new Date())){
            setErrorMessage("Project deadline can't be in the past.");
        }
       else {
            addProject(name, date).then((data) => {
                if(typeof(data) == 'object'){
                    modal.proj(data);
                    modal.toggle();             
                } else if(typeof(data) == 'string'){
                    setErrorMessage(data);   
                } else {
                    setErrorMessage("Something went wrong."); 
                }
            });    
        }
    };

    return (   
        <>
            <h2><b>Add New Project</b></h2>

            <form onSubmit={submitNewProject}>
                <label htmlFor="name"> <b>Project Name:</b>
                    <input type="text" id="project" className="input-style" value={name} onChange={handleNameChange}></input>
                </label>
                <br />
                <br />
                <label htmlFor="deadline"><b>Deadline:</b>  
                    <DateTimePicker className="datepicker-style" name="deadline" value={date} disableClock onChange={handleDateChange} />
                </label>
                <br />
                <br />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New</button>
            </form>

            <div id="modal_errors" >
                {errorMessage}
            </div>
  
        </>
    );
}