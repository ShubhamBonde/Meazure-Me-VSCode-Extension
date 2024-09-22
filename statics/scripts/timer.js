export class Timer {
    // public properties  
    ellapsedSeconds = 0;
    ellapsedMinutes = 0;
    ellapsedHours = 0;

    // private properties
    #interval = undefined;
    #timerValue = '00:00:00';
    
    // timer instance
    static timerInstance = undefined;
    
    static start() {
        if (!this.timerInstance) {
            this.timerInstance = new Timer();
            return;
        }

        this.timerInstance.startTimer();
    }

    static pause() {
        if (!this.timerInstance) {
            return;
        }

        // Clear timer interval to pause the incrementing of timer.
        this.timerInstance.clearInterval();
    }

    static stop() {
        if (!this.timerInstance) {
            return;
        }

        this.timerInstance.stopTimer();
        this.timerInstance = undefined;
    }

    static getValue() {
        if (!(this.timerInstance instanceof Timer)) {
            return '00:00:00';
        }

        return this.timerInstance.getTimerValue();
    } 

    constructor () {
        if (this.#interval) {
            this.clearInterval();
        }
        
        this.startTimer();
    }

    getInterval () {
        return this.#interval;
    }
    
    clearInterval () {
        
        if (!this.#interval) {
            return;
        }
        
        clearInterval(this.#interval);
        this.#interval = undefined;
    }

    startTimer() {
        if (this.#interval) {
            return;
        }

        this.#interval = setInterval(() => {
            this.ellapsedSeconds++;
            this.#timerValue = this.#convertEllapsedSecondsToDisplayTime(this.ellapsedSeconds);
        }, 1000);
    }

    stopTimer() {
        if (this.#interval) {
            this.clearInterval();
        }

        this.ellapsedSeconds = 0;
        this.ellapsedMinutes = 0;
        this.ellapsedSeconds = 0;
        this.#timerValue = '00:00:00';
    }

    #mayBeSuffixZero(number) {
        if (typeof number !== 'number') {
            return '00';
        }

        return number < 10 ? "0" + number : number;
    }

    #convertEllapsedSecondsToDisplayTime() {
        if (typeof this.ellapsedSeconds !== 'number') {
            return;
        }   

        if (this.ellapsedSeconds >= 60) {
            this.ellapsedMinutes++;
            this.ellapsedSeconds = 0;
        }

        if (this.ellapsedMinutes >= 60) {
            this.ellapsedHours++;
            this.ellapsedMinutes = 0;
        }

        return ("" + this.#mayBeSuffixZero(this.ellapsedHours)) + (":" + this.#mayBeSuffixZero(this.ellapsedMinutes)) + (":" + this.#mayBeSuffixZero(this.ellapsedSeconds));
    }

    getTimerValue () {
        return this.#timerValue;
    }
}
