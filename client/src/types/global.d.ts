/**
 * @file declare
 * @author kaivean
 */

import {AxiosInstance} from 'axios';
import {Store} from 'vuex';

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        username: number;
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
        $axios: AxiosInstance;
        $message: (config: {type?: 'warning'|'error'|'success', showClose?: boolen, message: string}) => void;
    }
}