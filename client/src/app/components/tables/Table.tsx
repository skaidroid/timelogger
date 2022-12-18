// import { format } from "date-fns";
import React, { useEffect,useState } from "react";
import { getAll } from "../../api/projects";
import { Project } from "../../models/project";
import Tabletimelogs from "./Tabletimelogs";

export default function Table() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectId, setProjectId] = useState(-1);
    let sortedProjects = [...projects];

    // TODO: add ability to sort in asc and des order 
    //For sorting deadlines
    sortedProjects.sort((a, b) => {
        if (a.deadline > b.deadline) {
          return -1;
        }
        if (a.deadline < b.deadline) {
          return 1;
        }
        return 0;
      });


    
    useEffect( () => { getAll().then((projects) => {setProjects(projects)}) } , [])

    function getTimelogs(project: Project){
        console.log("set project is", project.id);
        setProjectId(project.id);
    }
    
    
    return ( <> 
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2 w-12">#</th>
                    <th className="border px-4 py-2">Project Name</th>
                    <th className="border px-4 py-2">Total Hours</th>
                    <th className="border px-4 py-2">
                        <button type="button" onClick={() => setProjects(sortedProjects)}>
                            Deadline
                        </button>
                    </th>
                    <th className="border px-4 py-2">Is Completed</th>

                </tr>
            </thead>
            <tbody>
                { projects.map((project, index) => (
                    <tr key={project.id}  onClick={() => {getTimelogs(project)} }>
                        <td className="border px-4 py-2 w-12">{index + 1}</td>
                        <td className="border px-4 py-2">{project.name}</td>
                        <td className="border px-4 py-2">{project.totalHours}</td>
                        <td className="border px-4 py-2">{project.deadline}</td>
                        <th className="border px-4 py-2">{(project.isCompleted) ? "yes" : "no"}</th>
                    </tr>
                )) } 
       
            </tbody>
        </table>
            
            { //check if an project is selected before showing the user table with logs for the project
            (projectId != -1) &&
                <Tabletimelogs projectId = {projectId} />
            }
        </> 
    );
}
