import React, {useEffect, useState} from "react";
import Table from "../components/tables/Table";
import Modal from "../components/modals/Modal";
import openModal from "../components/modals/openModal";
import AddProjectModal from "../components/modals/AddProjectModal";
import AddNewLogModal from "../components/modals/AddNewLogModal";
import { getAll } from "../api/projects";
import { Project } from "../models/project";
import Tabletimelogs from "../components/tables/Tabletimelogs";
import { getTimelogById } from "../api/timelogs";
import { Timelog } from "../models/timelog";

export default function Projects() {
    const { isProjectModOpen, toggleProjectMod } = openModal();
    const { isTaskModOpen, toggleTaskMod } = openModal();
    
    const [projectId, setProjectId] = useState(-1);

    //Projects data
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect( () => { getAll().then((projects) => {setProjects(projects)}) } , [isProjectModOpen == false])

    //Timelog data
    const [timelogs, setTimelogs] = useState<Timelog[]>([]);
    
    useEffect( () => { getTimelogById(projectId).then((timelogs) => {setTimelogs(timelogs)}) } , [projectId]);
    
    //Use different hook for updating timelogs when new log is added we need to update projects since total time changed
    useEffect( () => { 
        getTimelogById(projectId).then((timelogs) => {setTimelogs(timelogs)});
        getAll().then((projects) => {setProjects(projects)});
   } , [isTaskModOpen == false]);

    //search project names
    const [searchInput, setSearchInput] = useState<string>('');
    const searchProjects = (event: React.FormEvent) => {
        event.preventDefault();
        if(searchInput.length > 0){
            getAll().then((projects: Project[]) => {setProjects(projects.filter(p => {
                return (p.name.toLowerCase()).includes(searchInput.toLowerCase());
            }))});
        } else {
            getAll().then((projects) => {setProjects(projects)});
        }
    };

    return (
        <>  
            <Modal isOpen={isProjectModOpen} toggle={toggleProjectMod}> <AddProjectModal toggle={toggleProjectMod} /> </Modal>
            
            <Modal isOpen={isTaskModOpen} toggle={toggleTaskMod}>
                <AddNewLogModal toggle={toggleTaskMod} />
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
                    {/* when user click on search search for all projects that contain search string in name*/}
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

            <Table  projects={projects} setProjects={setProjects}  projectId={projectId} setProjectId={setProjectId}/>
            { //check if an project is selected before showing the user table with logs for the project
            (projectId != -1) && 
            <>
            <h4 className="mt-5">Project name: {projects.find(p => p.id == projectId)?.name}</h4>
            <Tabletimelogs timelogs={timelogs} setTimelogs={setTimelogs} />
            </>
            
            }
        </>
    );
}
