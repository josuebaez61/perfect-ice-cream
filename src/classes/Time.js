export class Time {
    constructor(hours = 0,minutes = 30,sec = 59) {
        this.hours = hours;
        this.minutes = minutes;
        this.sec = sec;
    }
    
    substract(value, prop){
        this[prop] -= value;
        return this[prop];
    }
    
    printTimer(elementHtml) {
        elementHtml.html(`0${this.hours}:${this.minutes < 10 ? '0'+ this.minutes : this.minutes}:${ this.sec < 10 ? '0'+ this.sec : this.sec }`);
    }

    restart() {
        this.hour = 0;
        this.minutes = 30;
        this.sec = 59;
    }
}