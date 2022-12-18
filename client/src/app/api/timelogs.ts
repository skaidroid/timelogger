import { Timelog } from "../models/timelog";

const BASE_URL = "http://localhost:3001/api";

export async function getTimelog() {
    const response = await fetch(`${BASE_URL}/timelogs`);
    return response.json();
}

export async function getTimelogById(projectId: number) {
    const response = await fetch(`${BASE_URL}/timelogs/getTasksById/${projectId}`);

    return response.json();
}

export async function addNewTimelog(timelog: Timelog){
    console.log(timelog)
    return null;
}

