import { Project } from "../models/project";

const BASE_URL = "http://localhost:3001/api";

export async function getAll() {
    const response = await fetch(`${BASE_URL}/projects`);
    
    return response.json();
}

export async function getActiveProjectNames() {
    const response = await fetch(`${BASE_URL}/projects/getActiveNames`);
    
    return response.json();
}

export async function addProject(name: string, deadline: Date){

    try {
      const response = await fetch(`${BASE_URL}/projects/addProject`, 
      { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name: name, deadline: deadline})});

      if (!response.ok) {
        if (response.status === 400) {
          return response.text();
        } 

      } else {
        return response.json();
      }
    } catch (error) {
      console.log(error);
    }
    
   
}

export async function updateProject(project: Project){

    try {
        const response = await fetch(`${BASE_URL}/projects/updateProject`, 
        { method: 'POST', headers: {'Content-Type': 'application/json'}, body:  JSON.stringify(project)});
        if (!response.ok) {
          if (response.status === 400) {
            console.log(response)
          
          }
        } else {
          return response.json();
        }
      } catch (error) {
        console.log(error);
      }
    }
