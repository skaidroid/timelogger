import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { addProject } from "../../api/projects";

interface ModalType {
    toggle: () => void;
  }
export default function AddProjectModal(modal : ModalType) {
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
            console.log("Name can't be empty");
            return;
        }

        // if(date < (new Date())){
        //     console.log("Date can't be in the past");
        //     return;
        // }

        const response = addProject(name, date)
        modal.toggle();
        // .then(() => console.log("close window"))
        // .catch((e) => console.log(e))

        console.log(response);
    };

    return (   
        <>
            <h3> Add New Project</h3>

            <form onSubmit={submitNewProject}>
                <label htmlFor="name"> <b>Project Name:</b>
                    <input type="text" id="project" className="input-style" value={name} onChange={handleNameChange}></input>
                </label>
                <br />
                <br />
                <label htmlFor="deadline"><b>Deadline:</b>  
                    <DateTimePicker className="datepicker-style" name="deadline" value={date} onChange={handleDateChange} />
                </label>
                <br />
                <br />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New</button>
            </form>

            <div id="modal_errors" >
                {/* {() && <p></p>} */}

            </div>
  
        </>
    );
}