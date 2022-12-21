import React, {useState } from "react";
import { updateProject } from "../../api/projects";
import { dateFormating, totalTimeFormating } from "../../helpers/format";
import { Project } from "../../models/project";

interface PropList {
    projects: Project[]
    setProjects: (value: Project[]) => void
    projectId: number
    setProjectId: (value: number) => void
}
export default function Table (prop: PropList) {
    const [sortOrder, setSortOrder] = useState(1);


    function sortByProperty(sortProperty : string){        
      const sortedList = prop.projects.sort((a , b) => (a[sortProperty] > b[sortProperty]) ? 1*sortOrder : -1*sortOrder);    
      //-1 changes sort order
      setSortOrder(sortOrder * (-1));
      prop.setProjects(sortedList);
    }

    //Update if project is completed if projcet is complited
    function updateCompletness(index : number){
        const newProject = prop.projects[index];
        newProject.isCompleted = !newProject.isCompleted;
        updateProject(newProject).then((projects) => {prop.setProjects(projects)});
    }

    //get all time lof for the project by seting projectId which will update the table with logs
    function getTimelogs(project: Project){
        prop.setProjectId(project.id);
    }
    
    return ( <> 
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2 w-12">#</th>
                    <th className="border px-4 py-2">
                        <button type="button" onClick={() => { sortByProperty('name'); }}>
                            Project Name <i className=""> [sort] </i>
                        </button> 
                    </th>
                    <th className="border px-4 py-2">
                        <button type="button" onClick={() => { sortByProperty('totalHours'); }}>
                            Total Time <i className=""> [sort] </i>
                        </button>       
                    </th>
                    <th className="border px-4 py-2">
                        <button type="button" onClick={() => { sortByProperty('deadline'); }}>
                            Deadline <i className=""> [sort] </i>
                        </button>
                    </th>
                    <th className="border px-4 py-2">Is Completed</th>

                </tr>
            </thead>
            <tbody>
                {   prop.projects.map((project, index) => (
                    <tr key={project.id}  onClick={() => {getTimelogs(project)} }>
                        <td className="border px-4 py-2 w-12">{index + 1}</td>
                        <td className="border px-4 py-2">{project.name}</td>
                        <td className="border px-4 py-2"><b>{totalTimeFormating(project.totalHours)}</b></td>
                        <td className="border px-4 py-2">{dateFormating(project.deadline)}</td>
                        <th className="border px-4 py-1">
                            <input type="checkbox" checked={project.isCompleted} onChange={() => {updateCompletness(index);}} />
                            <label className="mx-2"> {project.isCompleted ? 'yes' : 'no'} </label>
                        </th>
                    </tr>
                )) } 
       
            </tbody>
        </table>
        {(prop.projects.length == 0) && <div>No projects.</div> }

            
        
        </> 
    );
}
