/**
 * @file cron
 * @author kaivean
 */

import {Koa, Logger} from 'akb-ts';
import {asyncTaskWrapper} from '../components/util';
import cluster from 'cluster';

async function cron(info: Array<Array<string|number>>) {
    info.push(['cron', 'every second']);
}

export default function (app: Koa, logger: Logger) {
    return async () => {
        if (cluster.isWorker) {
            let env = (cluster.worker.process as any).env;
            if (+env.NODE_APP_INSTANCE === 0) {
                asyncTaskWrapper(cron, logger);
            }
        }
        else {
            asyncTaskWrapper(cron, logger);
        }
    };
};
