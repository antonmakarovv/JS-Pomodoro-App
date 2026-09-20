const workBtn = document.querySelector('.work-btn');
const breakBtn = document.querySelector('.break-btn');
const pauseBtn = document.querySelector('.pause-btn');
const display = document.querySelector('.display');
const resetBtn = document.querySelector('.reset-btn');
const workSessions = document.querySelector('.work-sessions');
const status = document.querySelector('.status');

let timer;
let isBreakTime = false;
let workSession = 0;
let isClicked = false;
let isResuming = false;
let previousStatus = '';


const render = (duration) => {
  if (!isBreakTime && !isResuming) {
    workSession++
  }

  if (!isResuming) {
    if (!isBreakTime) {
      status.innerText = 'Work';
    } else {
      status.innerText = 'Break';
    }
  }

  isResuming = false;

  console.log('start timer')
  if (timer) {
    clearInterval(timer)
  }

  if (duration === 0) return;

  timer = setInterval(() => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    display.innerText = `${minutes} : ${seconds}`;
    workSessions.innerText = `${workSession}`

    if (duration === 0) {
      if (isBreakTime) {
        isBreakTime = false;
        render(45 * 60);
      } else {
        isBreakTime = true;
        breakTime(10 * 60);
      }
      
      display.classList.toggle('green');
      display.classList.add('time-up');
      setTimeout(() => display.classList.remove('time-up'), 3000)
    }
    duration--
  }, 1000, true)
}

const breakTime = () => {
  isBreakTime = true;
  if (timer) {
    clearInterval(timer);
    render(10 * 60);
  } else {
    render(10 * 60);
  }
}


const pause = () => {
  isClicked = isClicked ? false : true;
  if (timer) {
    if (isClicked) {
      previousStatus = status.innerText;
      clearInterval(timer);
      pauseBtn.innerText = "play";
      status.innerText = 'Pause'
    } else {
      const minutes = Number(display.innerText.split(":")[0]);
      const seconds = Number(display.innerText.split(":")[1]);
      const duration = minutes * 60 + seconds;
      pauseBtn.innerText = "pause";
      status.innerText = previousStatus || 'Work';
      isResuming = true;
      render(duration);
    }
  } else {
    return
  }
};

const reset = () => {
  status.innerText = 'Ready'
  workSessions.innerText = '0';
  workSession = 0;
  if (timer) {
    clearInterval(timer);
    display.innerText = '';
  } else return
}

workBtn.addEventListener('click', () => {
  render(45 * 60)
  display.classList.remove('green');
})

breakBtn.addEventListener('click', () => {
  breakTime()
  display.classList.add('green');
  status.innerText = 'Break'
})

pauseBtn.addEventListener('click', () => {
  pause()
})

resetBtn.addEventListener('click', () => {
  reset()
})