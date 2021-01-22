/**
 * @file middleware注册
 * @author kaivean
 */

import {Context} from 'akb-ts';

export default function () {
    return async (ctx: Context, next: () => Promise<any>) => {
        // console.log('auth middleware');
        await next();
    };
};