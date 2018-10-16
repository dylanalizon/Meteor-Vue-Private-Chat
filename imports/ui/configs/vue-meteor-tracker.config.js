import Vue from 'vue'
import VueMeteorTracker from 'vue-meteor-tracker'
import {Meteor} from 'meteor/meteor'


Meteor.startup(() => {
    Vue.use(VueMeteorTracker)
})