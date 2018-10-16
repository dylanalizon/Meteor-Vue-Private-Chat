import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        xs: 600,        //small to large handset
        sm: 960,        //small to medium tablet
        md: 1264,       //large tablet to laptop
        lg: 1904,       //desktop
        xl: Infinity,   //4k and ultra-wides
    }
})