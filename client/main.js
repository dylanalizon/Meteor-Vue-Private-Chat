import Vue from 'vue'
import {Meteor} from 'meteor/meteor';
import App from './AppComponent';

Meteor.startup(() => {
    new Vue({
        render: h => h( App )
    }).$mount('#app')
});