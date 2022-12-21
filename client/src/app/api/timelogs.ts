const BASE_URL = "http://localhost:3001/api";

export async function getTimelog() {
    const response = await fetch(`${BASE_URL}/timelogs`);
    return response.json();
}

export async function getTimelogById(projectId: number) {
    const response = await fetch(`${BASE_URL}/timelogs/getTasksById/${projectId}`);

    return response.json();
}

export async function addNewTimelog(tielog: {projectId: number, description: string, startTime: Date, endTime: Date}){
    try {
        const response = await fetch(`${BASE_URL}/timelogs/addTimelog`, 
        { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(tielog)});
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

