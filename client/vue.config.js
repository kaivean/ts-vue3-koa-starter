/**
 * @file vue config
 * @author kaivean
 */

// const path = require('path');
function getIP() {
    let interfaces = require('os').networkInterfaces();
    for (let devName of Object.keys(interfaces)) {
        let iface = interfaces[devName];
        for (let i = 0, len = iface.length; i < len; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

const port = 8555;

module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production' ? '/public/' : `http://${getIP()}:${port}/`,
    devServer: {
        host: '0.0.0.0',
        port,
        before: app => {
            app.use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                return next();
            });
        }
    },

    // configureWebpack: {
    //     output: {

    //     }
    // }
};
