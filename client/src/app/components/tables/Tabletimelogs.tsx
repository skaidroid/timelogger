import React, { useState } from "react";
import { dateFormating, totalTimeFormating } from "../../helpers/format";
import { Timelog } from "../../models/timelog";
interface PropList {
    timelogs: Timelog[]
    setTimelogs: (value: Timelog[]) => void

}

export default function Tabletimelogs(props: PropList) {
    const [sortOrder, setSortOrder] = useState(1);

    function sortByProperty(sortProperty : string){        
        const sortedList = props.timelogs.sort((a , b) => (a[sortProperty] > b[sortProperty]) ? 1*sortOrder : -1*sortOrder);    
        //-1 changes sort order
        setSortOrder(sortOrder * (-1));
        props.setTimelogs(sortedList);
    }

    return ( <> 
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2 w-12">#</th>
                    <th className="border px-4 py-2">Task Description</th>
                    <th className="border px-4 py-2">
                    <button type="button" onClick={() => { sortByProperty('startTime'); }}>
                        Start Time <i className=""> [sort] </i>
                    </button>
                    </th>
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
            {(props.timelogs.length == 0) && <div>There is no time logs for this project.</div> }
        </> 
    );
}



