/**
 * @file cron
 * @author kaivean
 */

import cluster from 'cluster';
import {Koa, Logger} from 'akb-ts';
import {cronWrapper} from '../components/util';


async function cron(addLog: (key: string, value: any) => void) {
    addLog('cron', 'every 20 second');
}

export default function (app: Koa, logger: Logger) {
    return async () => {
        if (cluster.isWorker) {
            let env = (cluster.worker.process as any).env;
            if (+env.NODE_APP_INSTANCE === 0) {
                cronWrapper(cron, logger);
            }
        }
        else {
            cronWrapper(cron, logger);
        }
    };
};
