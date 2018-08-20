import Vue from 'vue'

export default {
    actions: {
        sendNotification (context, notification) {
            Vue.notify({
                title: notification.title,
                text: notification.text,
                type: notification.type
            })
        }
    }
}