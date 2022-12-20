import React from "react";
import { dateFormating, totalTimeFormating } from "../../helpers/format";
import { Timelog } from "../../models/timelog";
interface PropList {
    timelogs: Timelog[]
}

export default function Tabletimelogs(props: PropList) {
    return ( <> 
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2 w-12">#</th>
                    <th className="border px-4 py-2">Task Description</th>
                    <th className="border px-4 py-2">Start Time</th>
                    <th className="border px-4 py-2">End Time</th>
                    <th className="border px-4 py-2">Task Time</th>
                </tr>
            </thead>
            <tbody>
                { props.timelogs.map((timelog, index) => (
                    <tr key={timelog.id}>
                        <td className="border px-4 py-2 w-12">{index+1}</td>
                        <td className="border px-4 py-2">{timelog.description}</td>
                        <td className="border px-4 py-2">{dateFormating(timelog.startTime)}</td>
                        <td className="border px-4 py-2">{dateFormating(timelog.endTime)}</td>
                        <th className="border px-4 py-2">{totalTimeFormating(timelog.totalTime)}</th>
                    </tr>
                )) } 
       
            </tbody>
        </table>
            {/* Check if there is any logs/task for the selected project */}
            {(props.timelogs.length == 0) && <div>There is no tasks for this project.</div> }
        </> 
    );
}



