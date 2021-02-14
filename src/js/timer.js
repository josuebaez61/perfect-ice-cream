import { Time } from '../classes/Time';

const htmlTimer = $('#timer');
const timeStorage = JSON.parse(localStorage.getItem('time'));
const time = timeStorage? new Time(timeStorage.hours, timeStorage.minutes, timeStorage.sec) : new Time();
time.printTimer(htmlTimer);
export const setTimer = () => {
    setInterval(() => {
        time.substract(1,'sec');
        if (time.sec === 0) {
            time.sec = 59;
            if ( time.minutes === 0 && time.sec === 59) {
                time.restart();
            } else {
                time.substract(1,'minutes');   
            }
        }
        localStorage.setItem('time', JSON.stringify(time));
        time.printTimer(htmlTimer);
    }, 1000);
}