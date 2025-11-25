const timer = document.querySelector('.timer');
let interval = null;

let seconds = 0;
let minutes = 0;
let hours = 0;

function setTimer() {
    seconds++;
    if (seconds > 59) {
        minutes++;
        seconds = 0;
    }
    if (minutes > 59) {
        hours++;
        minutes = 0;
    }
}

function updateTimer() {
    setTimer();
    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

function addZero(number) {
    return number >= 10 ? number : `0${number}`
}

function play() {
    if (!interval) {
        interval = setInterval(() => {
            timer.innerText = updateTimer();
        }, 1000);
    }
}

function stop() {
    clearInterval(interval);
    interval = null;
}

function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        play();
    } else {
        stop();
    }
}

document.addEventListener('DOMContentLoaded', play);
document.addEventListener('visibilitychange', handleVisibilityChange);