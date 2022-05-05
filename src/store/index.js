import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: {
            userId: window.sessionStorage.getItem('userId'),
            username: window.sessionStorage.getItem('username'),
            role: window.sessionStorage.getItem('role'),
            tname: window.sessionStorage.getItem('tname')
        }
    },
    mutations: {
        login(state, data) {
            state.user = data
            window.sessionStorage.setItem('userId', data.userId)
            window.sessionStorage.setItem('username', data.username)
            window.sessionStorage.setItem('role', data.role)
            window.sessionStorage.setItem('tname', data.tname)
        }
    },
    actions: {},
    modules: {}
});

export default store;
