/**
 * @file action
 * @author kaivean
 */

import {Context} from 'akb-ts';

export default async function (ctx: Context) {
    ctx.success({
        username: 'zhangsan'
    });
};
