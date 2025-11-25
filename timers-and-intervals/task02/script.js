const initialTimers = [
    { hours: "00", minutes: "00", seconds: "05" },
    { hours: "01", minutes: "00", seconds: "30" },
    { hours: "00", minutes: "02", seconds: "15" }
];

const buttons = [
    { text: "Start", value: "start" },
    { text: "Stop", value: "stop" },
    { text: "Reset", value: "reset" }
];

const timersState = [];

initialTimers.forEach((initialTimer, index) => {
    const timerBlock = document.createElement("div");
    timerBlock.classList.add("timerBlock");
    const timerRow = document.createElement("div");
    timerRow.innerHTML = `${initialTimer.hours}:${initialTimer.minutes}:${initialTimer.seconds}`;

    const buttonsRow = document.createElement("div");
    buttonsRow.classList.add("buttonsRow");
    buttons.forEach((button) => {
        const buttonObj = document.createElement("button");
        buttonObj.textContent = `${button.text}`;
        buttonObj.value = `${button.value}`;
        buttonsRow.appendChild(buttonObj);
    })

    timersState[index] = {
        element: timerRow,
        hours: Number(initialTimer.hours),
        minutes: Number(initialTimer.minutes),
        seconds: Number(initialTimer.seconds),
        initial: { ...initialTimer },
        intervalId: null
    };

    buttonsRow.addEventListener("click", (e) => {
        handleTimerBtnClick(e.target.value, index);
    })

    timerBlock.appendChild(timerRow);
    timerBlock.appendChild(buttonsRow);
    document.body.appendChild(timerBlock);
})

function handleTimerBtnClick(action, index) {
    if (action === "start") startTimer(index);
    if (action === "stop") stopTimer(index);
    if (action === "reset") resetTimer(index);
}

function startTimer(index) {
    const timer = timersState[index];

    if (timer.intervalId) return;

    timer.intervalId = setInterval(() => {
        if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
            stopTimer(index);
            return;
        }

        if(timer.seconds > 0 ){
            timer.seconds--;
        }
        else {
            timer.seconds = 59;
            if (timer.minutes > 0) {
                timer.minutes--;
            }
            else{
                timer.minutes = 59;
                timer.hours--;
            }
        }

        updateTimer(index);
    }, 1000);
}

function stopTimer(index) {
    clearInterval(timersState[index].intervalId);
    timersState[index].intervalId = null;
}

function resetTimer(index) {
    stopTimer(index);

    const timer = timersState[index];
    timer.hours = Number(timer.initial.hours);
    timer.minutes = Number(timer.initial.minutes);
    timer.seconds = Number(timer.initial.seconds);
    updateTimer(index);
}

function updateTimer(index) {
    const timer = timersState[index];
    timer.element.innerHTML = `${String(timer.hours).padStart(2, '0')}:${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`;
}
