import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            userId: '',
            profile: { nickname: {} },
            profile: { avatarUrl: {} },
            type: 0
        },
        urlinfo: {

        },
        id: '',
        boxshow: false,
        imgurl: '',
        arname: '',
        name: '',
        songlist: {},
        index: '',
        for: false,
    },
    mutations: {},
    actions: {},
    modules: {}
})