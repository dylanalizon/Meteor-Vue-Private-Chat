import Vue from 'vue'
import router from '../configs/vue-router.config'
import isLogged from "../../helpers/isLogged";

export default {
    state: {
        title: '',
        countNotifications: 0
    },
    mutations: {
        setTitle: function (state, title) {
            state.title = title
        },
        setCountNotifications: function (state, count) {
            state.countNotifications = count
        }
    },
    actions: {
        sendNotification (context, notification) {
            Vue.notify(notification)
        },
        changeTitle (context) {
            let count = context.state.countNotifications
            if (count > 0) {
                document.title = '('+count+') '+document.title
            } else {
                document.title = context.state.title
            }
        }
    }
}