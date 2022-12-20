import Moment from 'moment';


//Time is kept in minutes so we want to convert it to h and min when presenting it to the user
export function totalTimeFormating(time: number){
    let hours: number = Math.floor(time/60);
    let minutes: number = time%60;

    let formatTime: string = (hours > 0 ? (hours + "h ") : "") + minutes + "min";

    return formatTime;
}

//Formating date and time
export function dateFormating(date: Date){
   
    let dateString = Moment(date).format('DD-MM-yyyy HH:mm');

    return dateString;
    ;
}
