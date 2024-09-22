const projectNameInput = document.getElementById('project-name');
const projectTaskInput = document.getElementById('project-task');
const taskDescriptionInput = document.getElementById('task-description');

class Timer {
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

    constructor() {
        if (this.#interval) {
            this.clearInterval();
        }

        this.startTimer();
    }

    getInterval() {
        return this.#interval;
    }

    clearInterval() {

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

            // Update the time in the display container
            updateTime();
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
        updateTime();
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

    getTimerValue() {
        return this.#timerValue;
    }
}

function updateTime() {
    const timeDisplayContainerNode = document.getElementById('project-ellapsed-time-display-cell');

    if (!timeDisplayContainerNode) {
        throw new ReferenceError('Couldn\'t display timer value as display container node is not found.');
    }

    timeDisplayContainerNode.innerText = Timer.getValue();
}


function handleProjectStart() {

    // If the project name and task is valid then hide the project.
    if (!isProjectDetailsFormValid()) {
        return;
    }

    toggleProjectDetailsFormVisibility(false);
    toggleProjectDetailsTableVisibility(true);

    showProjectDetails();
    Timer.start();
}

function isProjectDetailsFormValid() {
    const isProjectNameValid = projectNameInput && projectNameInput.checkValidity(),
        isTaskNameValid = projectTaskInput && projectTaskInput.checkValidity();

    return (isProjectNameValid && isTaskNameValid);
}

function toggleElementVisibility(element, canShowBtn) {
    if (!element) {
        throw new ReferenceError('Unable to toggle the visibility of the element as element node doesn\'t exist.');
    }

    if (canShowBtn === true) {
        element.classList.remove('no-display');
        return;
    }

    if (element.classList.contains('no-display')) {
        return;
    }

    element.classList.add('no-display');
}

function toggleProjectDetailsFormVisibility(canShow=false) {
    const projectDetailsForm = document.getElementById('project-details-form');

    if (!projectDetailsForm) {
        throw new ReferenceError('Unable to start the project as project form object doesn\'t exist.');
    }

    toggleElementVisibility(projectDetailsForm, canShow);
}

function toggleProjectDetailsTableVisibility(canShow=false) {
    const projectDetailsCntr = document.getElementById('project-details-display-cntr');

    if (!projectDetailsCntr) {
        throw new ReferenceError("Unable to start the project as project details display container object doesn\'t exist.");
    }

    toggleElementVisibility(projectDetailsCntr, canShow);
}

function getProjectDetails() {
    const projectDetails = {};

    if (projectNameInput) {
        projectDetails.name = projectNameInput.value.trim();
    }

    if (projectTaskInput) {
        projectDetails.task = projectTaskInput.value.trim();
    }

    if (taskDescriptionInput) {
        projectDetails.description = taskDescriptionInput.value.trim();
    }

    return projectDetails;
}

function showProjectDetails() {
    const projectNameCell = document.getElementById('project-name-display-cell'),
        projectDetails = getProjectDetails();

    if (projectNameCell) {
        projectNameCell.innerText = projectDetails.name || "";
    }

    const projectTaskCell = document.getElementById('project-task-display-cell');

    if (projectTaskCell) {
        projectTaskCell.innerText = projectDetails.task || "";
    }

    const projectDescriptionCell = document.getElementById('project-task-description-display-cell');
    if (projectDescriptionCell) {
        projectDescriptionCell.innerText = projectDetails.description || "";
    }
}


function handlePauseClick() {
    Timer.pause();

    // Hide pause button itself.
    togglePauseBtnVisibility(false);

    // Show Resume Button
    toggleResumeBtnVisibility(true);
    
    // Show stop button as well.
    toggleStopBtnVisibility(true);
}

function handleStopClick() {
    Timer.stop();

    // Hide stop button
    toggleStopBtnVisibility(false);

    // Hide pause button
    togglePauseBtnVisibility(false);

    // Show start button
    toggleResumeBtnVisibility(true);
}


function handleResumeClick() {
    Timer.start();

    toggleResumeBtnVisibility(false);
    togglePauseBtnVisibility(true);
    toggleStopBtnVisibility(true);

}

function toggleStopBtnVisibility(canShowBtn=false) {
    const stopButton = document.getElementById('stop-tracking-button');

    if (!stopButton) {
        return;
    }

    toggleElementVisibility(stopButton, canShowBtn);
}

function togglePauseBtnVisibility(canShowBtn=false) {
    const pauseButton = document.getElementById('puase-tracking-button');

    if (!pauseButton) {
        return;
    }

    toggleElementVisibility(pauseButton, canShowBtn);
}

function toggleResumeBtnVisibility(canShowBtn=false) {
    const resumeButton = document.getElementById('resume-tracking-button');

    if (!resumeButton) {
        return;
    }

    toggleElementVisibility(resumeButton, canShowBtn);
}