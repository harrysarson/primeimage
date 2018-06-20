export const runWhen = (test, maxTries) =>
  new Promise((resolve, reject) => {
    let delayCount = 0;

    requestAnimationFrame(function attempt() {
      if (test()) {
        resolve();
      } else {
        delayCount += 1;

        if (delayCount > maxTries) {
          reject(new Error(`Could not set initial number config values after ${maxTries} attempt(s)`));
        } else {
          requestAnimationFrame(attempt);
        }
      }
    });
  });
