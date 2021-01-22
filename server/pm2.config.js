/*eslint-disable*/
/**
 * @file pm2线上配置
 *      pm2教程 http://www.jianshu.com/p/fdc12d82b661
 *      官方文档 http://pm2.keymetrics.io/docs/usage/application-declaration/
 * @author sekiyika(pengxing5501854@gmail.com)
 */
const path = require('path');
const root = path.resolve(__dirname);
const packageJson = require('./package.json');

module.exports = {
    apps: [
        {
            name: packageJson.name,
            script: root + '/index.js',
            exec_mode: 'cluster',
            cwd: root,
            watch: false, // 禁止watch，如果没有忽略监听logs等目录，会一直重启
            // interpreter: root + '/nodejs/bin/node', // nodejs命令
            env: {
                'NODE_ENV': 'production',
                'APP_NAME': packageJson.name
            },
            error_file: root + '/logs/pm2/err.log',
            out_file: root + '/logs/pm2/out.log'
        }
    ]
};
