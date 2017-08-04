import Vue from 'vue'
import axios from 'axios'

const state = {
    newlist: {},
}

const mutations = {
    news (state, payload) {
        state.newlist = payload.res;
    }
}

const actions = {
    news({commit}, payload){
        axios.get('getnews?p=' + payload.queryStr).then(res => {
            commit({
                type: 'news',
                res: res.data
            })
        }, error => {
            console.log('请启动node server')
        });
    }
}

const getters = {}

export default {
    state,
    mutations,
    getters,
    actions
}
