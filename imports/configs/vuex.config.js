import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../../client/store/auth'
import application from '../../client/store/application'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        application,
        auth
    }
})

export default store