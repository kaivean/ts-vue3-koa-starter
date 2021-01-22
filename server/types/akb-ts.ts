/**
 * @file 声明
 *       模块拓展声明：https://www.tslang.cn/docs/handbook/declaration-files/templates/module-plugin-d-ts.html
 * @author kaivean
 */

import 'akb-ts';

declare module 'akb-ts' {
    export interface Context {
        addLog: (key: string, value: any) => void;
        saveInfo: () => void;
        saveWarn: (e?: Error) => void;
        saveError: (e?: Error) => void;

        error: (msg: string, status: number) => void;
        success: (data: any) => void;
    }
}
