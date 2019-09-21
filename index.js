let countdown;
const timerDisplay = document.querySelector('.timer-display');
const endTime = document.querySelector('.end-timer-display');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(secondsLeft);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remaindSeconds = seconds % 60;
    const display = `${minutes} : ${remaindSeconds < 10 ? '0' : ''} ${remaindSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

timer(60);

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${adjustedHour} : ${minutes < 10 ? '0':''} ${minutes}`;
}

function startTime() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach((button) => {
    button.addEventListener('click', startTime);
});

