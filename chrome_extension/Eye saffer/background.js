const timeToCloseNotifocations = 3000;

const createNotification = () => {
  chrome.notifications.create({
    type: 'basic', 
    iconUrl: './images/pen.png',
    title: 'Напоминание',
    message: `Разминка будет запущена через ${initWarmupWarning / 1000} секунд`
  }, (id) => {
    setTimeout(() => {
      chrome.notifications.clear(id);
    }, timeToCloseNotifocations);
  })
};

const createNewWarmupWindow = (warmupTime) => {
  chrome.windows.create({
    url: './warmup/index.html',
    state: 'maximized',
    focused: true,
    state: 'fullscreen'
  }, (window) => {
    setTimeout(() => {
      chrome.windows.remove(window.id);
    }, warmupTime);
  });
};

let warmupTimer;
let warningTimer;
let restTime;
let timeBeforeStop;
let initTimeBetweenWarmups;
let initWarmupWarning;
let initWarmupTime;

chrome.runtime.onInstalled.addListener(() => {
  const initialTimers = {
    timeBetweenWarmups: 3600000,
    warmupWarning: 30000,
    warmupTime: 1800,
    timeBeforeStop: 0,
    isTimerActive: true
  }

  chrome.storage.sync.set(initialTimers);
});

const clearTimers = () => {
  clearTimeout(warmupTimer);
  clearTimeout(warningTimer);
}

const setNewValueToStorage = (newValues) => {
  chrome.storage.sync.get(oldValues => {
    chrome.storage.sync.set({
      ...oldValues,
      ...newValues
    });
  })
}

const createTimers = (timeBetweenWarmups, warmupWarning, warmupTime) => {
  clearTimers();
  restTime = Date.now() + timeBetweenWarmups;
  const timeBeforeWarning = (timeBetweenWarmups - warmupWarning < 0)
    ? initTimeBetweenWarmups - warmupWarning + timeBetweenWarmups
    : timeBetweenWarmups - warmupWarning;

  warmupTimer = setTimeout(function logTime() {
    createNewWarmupWindow(initWarmupTime);
    restTime = Date.now() + initTimeBetweenWarmups + initWarmupTime;

    warmupTimer = setTimeout(logTime, initTimeBetweenWarmups + warmupTime);
  }, timeBetweenWarmups);

  warningTimer = setTimeout(function logTime() {
    createNotification();

    warningTimer = setTimeout(logTime, initTimeBetweenWarmups + warmupTime);
  }, timeBeforeWarning);
};

const startTimers = (initialTimers) => {
  const { timeBetweenWarmups, warmupWarning, warmupTime, timeBeforeStop, isTimerActive } = initialTimers;

  initTimeBetweenWarmups = timeBetweenWarmups;
  initWarmupWarning = warmupWarning;
  initWarmupTime = warmupTime;

  createTimers(timeBetweenWarmups, warmupWarning, warmupTime);
};

chrome.storage.sync.get(startTimers);


// Message handling

chrome.runtime.onMessage.addListener(({ action }, sender, sendResponse) => {
  switch(action) {
    case 'GET_REST_TIME': {
      if (timeBeforeStop) {
        return sendResponse({ time: Date.now() + timeBeforeStop, isCounterDisable: true });
      };

      sendResponse({ time: restTime });
      break;
    };
    case 'RESET_REST_TIME': {
      restTime = Date.now() + initTimeBetweenWarmups + initWarmupTime;
      sendResponse({ time: restTime });
      break;
    };
    case 'STOP_TIMER': {
      clearTimers();
      timeBeforeStop = restTime - Date.now();
      setNewValueToStorage({ isTimerActive: false });
      sendResponse({ time: restTime, isCounterDisable: true });
      break;
    };
    case 'RESUME_TIMER': {
      createTimers(timeBeforeStop, initWarmupWarning, initWarmupTime);
      sendResponse({ time: Date.now() + timeBeforeStop, isCounterDisable: false });
      timeBeforeStop = 0;
      setNewValueToStorage({ isTimerActive: true });
      break;
    };
    case 'RESET_TIMER': {
      createTimers(initTimeBetweenWarmups, initWarmupWarning, initWarmupTime);
      sendResponse({ time: Date.now() + initTimeBetweenWarmups, isCounterDisable: false });
      timeBeforeStop = 0;
      setNewValueToStorage({ isTimerActive: true });
      break;
    };
  }
});

// End message handling

// Chrome storage handling

chrome.storage.onChanged.addListener(changes => {
  const { timeBetweenWarmups, warmupWarning, warmupTime } = changes;
  
  for (let key in changes) {
    changes[key] = changes[key].newValue;
  }

  setNewValueToStorage(changes);

  timeBetweenWarmups && (initTimeBetweenWarmups = timeBetweenWarmups.newValue);
  warmupWarning && (initWarmupWarning = warmupWarning.newValue);
  warmupTime && (initWarmupTime = warmupTime.newValue);
});

// Stop chrome storage handling
