// Re registration cron jobs
import { flowRegisterOnSystemInit } from '../../services/flow.service';

flowRegisterOnSystemInit().then((cnt) => { Logger.log(`${cnt} CronFlow registed...`); }).catch((e) => {
    Logger.error(`CronFlows init faild, ${e.message}`);
});
