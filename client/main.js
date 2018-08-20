import Vue from 'vue'
import {Meteor} from 'meteor/meteor'
import App from './imports/ui/AppComponent'
import VueMeteorTracker from 'vue-meteor-tracker'
import './configs/vuetify.config'
import router from './configs/router.config'
import store from './configs/vuex.config'
import Notifications from 'vue-notification'
import '/lib/api/messages'

Meteor.startup(() => {

    Vue.use(VueMeteorTracker)
    Vue.use(Notifications)

    new Vue({
        router,
        store,
        render: h => h( App )
    }).$mount('#app')
})