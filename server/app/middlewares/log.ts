/**
 * @file log
 * @author kaivean
 */

import {Context} from 'akb-ts';
import moment from 'moment';

function format(messages) {
    let output = '';
    messages.forEach(message => {
        let val = message[1];
        if (val === undefined || val === null) {
            val = '';
        }
        if (typeof val !== 'string') { // obj array等
            val = JSON.stringify(val);
        }
        // [ ] 转换成形式:  &#x + ASCII值。 因为格式化时外围时[]
        val = val.replace(/\[/g, '&#x123');
        val = val.replace(/\]/g, '&#x125');
        output += `${message[0]}[${val}] `;
    });
    return output;
}

function getLog(ctx: Context) {
    let info = [
        ['time', moment().format('YYYY-MM-DD HH:mm:ss')],
        ['url', ctx.url],
        ['status', ctx.status],
        ['method', ctx.method],
        ['ip', ctx.ip],
        ['host', ctx.ip],
        ['cookie', ctx.headers.cookie],
        ['useragent', ctx.headers['user-agent']],
        ['referer', ctx.headers.referer],
        ['cost', Date.now() - ctx.startTime],
        ...ctx.customLog
    ];
    return format(info);
}

function addLog(key, value) {
    let ctx = this as Context;
    ctx.customLog.push([key, value]);
}

function saveInfo() {
    let ctx = this as Context;
    ctx.logger.info(getLog(ctx)); // 默认字符串里有\n，会多行打印，但我们一个请求的日志最好应该是一行保存，因此自行格式化
}

function saveWarn(e?: Error) {
    let ctx = this as Context;

    if (e) {
        let stack = e.stack || '';
        // 必须把\n 替换掉，否则logger组件打印多行到日志，不方便统计
        stack = stack.replace(/\n/g, '\t');
        ctx.addLog('error', stack);
    }

    ctx.logger.warn(getLog(ctx));
}

function saveError(e?: Error) {
    let ctx = this as Context;

    if (e) {
        let stack = e.stack || '';
        // 必须把\n 替换掉，否则logger组件打印多行到日志，不方便统计
        stack = stack.replace(/\n/g, '\t');
        ctx.addLog('error', stack);
    }
    ctx.logger.error(getLog(ctx));
}

export default function () {
    return async (ctx: Context, next: () => Promise<any>) => {
        ctx.startTime = Date.now();

        ctx.customLog = [];
        ctx.addLog = addLog;

        ctx.saveInfo = saveInfo;
        ctx.saveWarn = saveWarn;
        ctx.saveError = saveError;

        ctx.error = function (msg: string, status: number) {
            return {
                status: status || 1,
                msg
            };
        };

        ctx.success = function (data: any) {
            ctx.body = {
                status: 0,
                data
            };
        };

        await next();

        ctx.saveInfo();
    };
};
