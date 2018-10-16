import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../store/auth'
import application from '../store/application'
import chat from '../store/chat'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        application,
        auth,
        chat
    }
})

export default store