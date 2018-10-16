import Vue from 'vue'
import {Meteor} from 'meteor/meteor'
import App from '../imports/ui/AppComponent'

//Config
import '../imports/ui/configs/vue-meteor-tracker.config'
import '../imports/ui/configs/vue-mq.config'
import '../imports/ui/configs/vue-notification.config'
import router from '../imports/ui/configs/vue-router.config'
import '../imports/ui/configs/vuetify.config'
import store from '../imports/ui/configs/vuex.config'

Meteor.startup(() => {
    $('html').attr('lang', 'fr')

    new Vue({
        router,
        store,
        render: h => h( App )
    }).$mount('#app')
})