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

const render = (duration) => {
  if (!isBreakTime) {
    workSession++
  }

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
        render(5);
      } else {
        isBreakTime = true;
        breakTime(10);
      }
      
      display.classList.toggle('green');
      display.classList.add('time-up');
      setTimeout(() => display.classList.remove('time-up'), 3000)
    }
    duration--
  }, 1000, true)
}

const breakTime = () => {
  if (timer) {
    clearInterval(timer);
    render(10);
  } else return
}

let isClicked = false;
const pause = () => {
  if (timer) {
    isClicked = isClicked ? false : true;

    if (isClicked) {
      clearInterval(timer);
      pauseBtn.innerText = "play";
    } else {
      const minutes = Number(display.innerText.split(":")[0]);
      const seconds = Number(display.innerText.split(":")[1]);
      const duration = minutes * 60 + seconds;
      pauseBtn.innerText = "pause";
      render(duration);
    }
  } else {
    return
  }
};

const reset = () => {
  workSessions.innerText = '0';
  if (timer) {
    clearInterval(timer);
    display.innerText = '';
  } else return
}

workBtn.addEventListener('click', () => {
  render(5)
  display.classList.remove('green');
})

breakBtn.addEventListener('click', () => {
  breakTime()
  display.classList.add('green');
})

pauseBtn.addEventListener('click', () => {
  pause()
})

resetBtn.addEventListener('click', () => {
  reset()
})