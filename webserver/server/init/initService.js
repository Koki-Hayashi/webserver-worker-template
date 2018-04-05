// @flow
const log4js = require('log4js');

export default function init(): void {
  setupLogger();

  Promise.all([
    // so far nothing
  ]).catch(error => {
    logger.log(error);
    logger.log(
      'Because of above error, failed to initializing the app. We are gonna stop! Bye!'
    );
    process.exit(1);
  });
}

function setupLogger(): void {
  global.logger = log4js.getLogger();
}
