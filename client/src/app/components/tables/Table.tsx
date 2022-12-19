// import { format } from "date-fns";
import React, { useState } from "react";
// import { getAll } from "../../api/projects";
import { Project } from "../../models/project";
import Tabletimelogs from "./Tabletimelogs";
interface PropList {
    projects: Project[]
}

export default function Table(props: PropList) {
    const [projectId, setProjectId] = useState(-1);
    // let sortedProjects = [...projects];

    // TODO: add ability to sort in asc and des order 
    //For sorting deadlines
    // sortedProjects.sort((a, b) => {
    //     if (a.deadline > b.deadline) {
    //       return -1;
    //     }
    //     if (a.deadline < b.deadline) {
    //       return 1;
    //     }
    //     return 0;
    //   });


    

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
                        <button type="button" onClick={() => console.log("print ")}>
                        {/* setProjects(sortedProjects) */}
                            Deadline
                        </button>
                    </th>
                    <th className="border px-4 py-2">Is Completed</th>

                </tr>
            </thead>
            <tbody>
                { props.projects.map((project, index) => (
                    <tr key={project.id}  onClick={() => {getTimelogs(project)} }>
                        <td className="border px-4 py-2 w-12">{index + 1}</td>
                        <td className="border px-4 py-2">{project.name}</td>
                        <td className="border px-4 py-2">{project.totalHours}</td>
                        <td className="border px-4 py-2">{project.deadline}</td>
                        <th className="border px-4 py-2">
                            <label>
                            <input type="checkbox" checked={project.isCompleted} onChange={(e:  React.ChangeEvent<HTMLInputElement>) => {console.log("update project by Id ", e.target.value ); project.isCompleted = !project.isCompleted}} />
                                Is project complited
                             </label>
                        </th>
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
