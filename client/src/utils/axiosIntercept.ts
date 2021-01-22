/**
 * @file axios intercept
 * @author kaivean
 */

import axios from 'axios';
import {Vue} from 'vue-class-component';

let vueInstance: Vue;

function errHandle(msg: string) {
    vueInstance.$message({
        showClose: true,
        message: msg,
        type: 'error'
    });
}

axios.defaults.baseURL = '';
axios.interceptors.response.use(
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response => {
        // 未登录
        if (response.data.status === 1000) {
            location.reload();
        }
        else if (response.data.status) {
            errHandle(response.data.msg);
        }

        return response;
    },

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    error => {
        errHandle(error.message);
        return Promise.reject(error);
    }
);


export function setVueInstance(instance: Vue) {
    vueInstance = instance;
}

