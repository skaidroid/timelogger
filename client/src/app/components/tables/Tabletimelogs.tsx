import React, { useEffect,useState } from "react";
import { getTimelogById } from "../../api/timelogs";
import { Timelog } from "../../models/timelog";


export default function Tabletimelogs(props: { projectId: number; }) {
    const [timelogs, setTimelog] = useState<Timelog[]>([]);
    useEffect( () => { getTimelogById(props.projectId).then((timelogs) => {setTimelog(timelogs)}) } , [props.projectId]);
    
    return ( <> 
        <br />
        <br />
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2 w-12">#</th>
                    <th className="border px-4 py-2">Task Description</th>
                    <th className="border px-4 py-2">Start Time</th>
                    <th className="border px-4 py-2">End Time</th>
                    <th className="border px-4 py-2">Total Time</th>
                </tr>
            </thead>
            <tbody>
                { timelogs.map((timelog, index) => (
                    <tr>
                        <td className="border px-4 py-2 w-12">{index+1}</td>
                        <td className="border px-4 py-2">{timelog.description}</td>
                        <td className="border px-4 py-2">{timelog.startTime}</td>
                        <td className="border px-4 py-2">{timelog.endTime}</td>
                        <th className="border px-4 py-2">{totalTimeFormating(timelog.totalTime)}</th>
                    </tr>
                )) } 
       
            </tbody>
        </table>
            {/* Check if there is any logs/task for the selected project */}
            {(timelogs.length == 0) && <div>There is no tasks for this project.</div> }
        </> 
    );
}

//Time is kept in minutes so we want to convert it to h and min when presenting it to the user
function totalTimeFormating(time: number){
    let hours: number = Math.floor(time/60);
    let minutes: number = time%60;

    let formatTime: string = hours + "h " + minutes + "min";

    return formatTime;
}


