/**
 * @file action
 * @author kaivean
 */

import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import {Context} from 'akb-ts';
import globals from '../../config/globals';

async function fetchHtml(ctx: Context) {
    return axios({
        url: 'http://127.0.0.1:8555/',
        method: 'get',
        // responseType: 'text',
        headers: ctx.headers || {}
    });
}

export default async function (ctx: Context) {
    if (process.env.NODE_ENV === 'development') {
        const res = await fetchHtml(ctx);
        ctx.body = res.data;
    }
    else {
        const file = path.resolve(globals.appdir, 'public', 'index.html');
        ctx.body = fs.readFileSync(file, 'utf8');
    }
};
