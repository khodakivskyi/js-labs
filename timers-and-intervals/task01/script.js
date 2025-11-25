const timerObj = document.querySelector('#timer');

function addNumber(number) {
    if (parseInt(number) < 10) {
        return `0${number}`;
    }
    return `${number}`;
}

function timer() {
    let time = new Date();
    timerObj.innerHTML = `${addNumber(time.getHours())}:${addNumber(time.getMinutes())}:${addNumber(time.getSeconds())}`;
}

setInterval(timer, 1000);