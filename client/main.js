import Vue from 'vue'
import {Meteor} from 'meteor/meteor'
import App from '../imports/ui/AppComponent'
import VueMeteorTracker from 'vue-meteor-tracker'
import '../imports/configs/vuetify.config'
import router from '../imports/configs/router.config'
import store from '../imports/configs/vuex.config'
import Notifications from 'vue-notification'
import '../imports/api/messages'

Meteor.startup(() => {

    Vue.use(VueMeteorTracker)
    Vue.use(Notifications)

    new Vue({
        router,
        store,
        render: h => h( App )
    }).$mount('#app')
})