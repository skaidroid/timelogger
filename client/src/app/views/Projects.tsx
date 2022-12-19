import React, {useEffect, useState} from "react";
import Table from "../components/tables/Table";
import Modal from "../components/modals/Modal";
import openModal from "../components/modals/openModal";
import AddProjectModal from "../components/modals/AddProjectModal";
import AddNewLogModal from "../components/modals/AddNewLogModal";
import { getAll } from "../api/projects";
import { Project } from "../models/project";



export default function Projects() {
    const { isProjectModOpen, toggleProjectMod } = openModal();
    const { isTaskModOpen, toggleTaskMod } = openModal();
    //Projects data
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect( () => { getAll().then((projects) => {setProjects(projects)}) } , [isProjectModOpen == false])
    
    //search data
    const [searchInput, setSearchInput] = useState<string>('');
    const searchProjects = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("test search data", searchInput);

    };

    return (
        <>  
            <Modal isOpen={isProjectModOpen} toggle={toggleProjectMod}> <AddProjectModal /> </Modal>
            
            <Modal isOpen={isTaskModOpen} toggle={toggleTaskMod}>
                <AddNewLogModal />
            </Modal>

            <div className="flex items-center my-6">
                <div className="w-1/2">
                    <button 
                        id="add-project"
                        onClick={toggleProjectMod}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add New Project
                    </button>
                    <button 
                        id="add-timelogs"
                        onClick={toggleTaskMod}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                        Add New Timelog
                    </button>
                </div>

                <div className="w-1/2 flex justify-end">
                    <form  onSubmit={searchProjects}>
                        <input
                            value={searchInput}
                            onChange={(e:  React.ChangeEvent<HTMLInputElement>) => { setSearchInput(e.target.value)}}
                            className="border rounded-full py-2 px-4"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <Table projects={projects} />
        </>
    );
}
