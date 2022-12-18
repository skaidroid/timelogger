// import { Project } from "../models/project";

const BASE_URL = "http://localhost:3001/api";

export async function getAll() {
    const response = await fetch(`${BASE_URL}/projects`);
    
    return response.json();
}

export async function getProjectNames() {
    const response = await fetch(`${BASE_URL}/projects/getNames`);
    
    return response.json();
}

export async function addProject(name: string, deadline: Date){
    const response = await fetch(`${BASE_URL}/projects/addProject`, 
    { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name: name, deadline: deadline})});

    return response.json();
}

