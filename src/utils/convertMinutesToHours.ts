export function convertMinutesToHour(minutesData : number){
    const hours = Math.floor(minutesData / 60);
    const minutes = minutesData % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}