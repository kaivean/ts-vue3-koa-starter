/**
 * @file 入口
 * @author kaivean
 */

import App from 'akb-ts';

const app = new App();

app.on('error', (error, {ctx}) => {
    if (ctx) {
        ctx.saveError(error);
    }
});

app.run();
