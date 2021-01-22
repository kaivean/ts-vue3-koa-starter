/**
 * @file store
 *        vue 支持TS：https://next.vuex.vuejs.org/guide/typescript-support.html
 * @author kaivean
 */

import {InjectionKey} from 'vue';
import {createStore, useStore as baseUseStore, Store} from 'vuex';

export interface State {
    username: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
    return baseUseStore(key);
}

export function useState() {
    return baseUseStore(key).state;
}

export default createStore<State>({
    state: {
        username: ''
    },
    mutations: {
        appData(state, appData: State) {
            state.username = appData.username;
        }
    },
    actions: {
    },
    modules: {
    },
});
