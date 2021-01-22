/**
 * @file 工具
 * @author kaivean
 */

import {Logger} from 'akb-ts';
import moment from 'moment';

export function isProd() {
    return process.env.NODE_ENV === 'production';
}

export function format(messages: any) {
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
        // 必须把\n 替换掉，否则logger组件打印多行到日志，不方便统计
        val = val.replace(/\n/g, '\t');
        output += `${message[0]}[${val}] `;
    });
    return output;
}

// 每个async开始的函数都应该有try catch
export async function asyncTaskWrapper(fn, logger: Logger) {
    let startTime = Date.now();
    let info = [] as Array<Array<string|number>>;
    info.push(['time', moment().format('YYYY-MM-DD HH:mm:ss')]);

    try {
        await fn(info);
        info.push(['cost', Date.now() - startTime]);
        logger.info(format(info));
    }
    catch (e) {
        console.error('asyncTaskWrapper err', e);
        info.push(['cost', Date.now() - startTime]);
        logger.error(format(info));
    }
}