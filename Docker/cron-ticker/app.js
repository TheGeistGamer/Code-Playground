const cron = require('node-cron');

let history = 0
cron.schedule('*/5 * * * * *', () => {
    history++;
    console.log('Running a task every 5 seconds', history);
});