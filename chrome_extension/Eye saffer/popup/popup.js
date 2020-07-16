const saveButton = document.getElementById('save');
const counter = document.getElementById('counter');
const stopCounter = document.getElementById('stopCounter');
const startCounter = document.getElementById('startCounter');
const resetCounter = document.getElementById('resetCounter');

const beforeWarmupTime = document.getElementById('beforeWarmupTime');
const warnAboutWarmup = document.getElementById('warnAboutWarmup');
const warmupTime = document.getElementById('warmupTime');

let timer;
let stopTime;

const showTime = (time) => {
  let seconds = time % 60; // Получаем секунды
  let minutes = (time / 60) % 60; // Получаем минуты
  let hour = (time / 60 / 60) % 60; // Получаем часы
  counter.innerText = `${Math.trunc(hour)}:${Math.trunc(minutes)}:${seconds}`;
}

const countdown = ({ time, isCounterDisable }) => {
  clearInterval(timer);
  
  actualTime = Math.trunc((time - Date.now()) / 1000);

  if (isCounterDisable) {
    showTime(actualTime);
    return;
  }
  
  timer = setTimeout(function logTime() {
    if (actualTime <= 0) {
      chrome.runtime.sendMessage({ action: 'RESET_REST_TIME' }, countdown);
    }
    
    showTime(actualTime);
    stopTime = actualTime;
    actualTime--;

    timer = setTimeout(logTime, 1000);
  }, 10);
};

const getRestTime = () => {
  chrome.runtime.sendMessage({ action: 'GET_REST_TIME' }, countdown);
};

getRestTime();

chrome.storage.sync.get((backgroundState) => {
  const {
    timeBetweenWarmups,
    warmupWarning,
    warmupTime,
    isTimerActive
  } = backgroundState;

  beforeWarmupTime.value = timeBetweenWarmups / 60 / 1000;
  warnAboutWarmup.value = warmupWarning / 60 / 1000;
  warmupTime.value = warmupTime / 1000;

  if (!isTimerActive) {
    stopCounter.disabled = true;
  } else {
    startCounter.disabled = true;
  }
});

saveButton.addEventListener('click', () => {
  const timers = {
    timeBetweenWarmups: beforeWarmupTime.value * 60 * 1000,
    warmupWarning: warnAboutWarmup.value * 60 * 1000,
    warmupTime: warmupTime.value * 1000,
  };

  chrome.storage.sync.set(timers);
});

resetCounter.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'RESET_TIMER' }, countdown);
});

startCounter.addEventListener('click', () => {
  startCounter.disabled = true;
  stopCounter.disabled = false;

  chrome.runtime.sendMessage({ action: 'RESUME_TIMER' }, countdown);
});

stopCounter.addEventListener('click', () => {
  stopCounter.disabled = true;
  startCounter.disabled = false;

  chrome.runtime.sendMessage({ action: 'STOP_TIMER' }, countdown);
});
