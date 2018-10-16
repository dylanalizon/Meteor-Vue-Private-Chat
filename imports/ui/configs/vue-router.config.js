import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes'
import isLogged from '../../helpers/isLogged'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title && !to.meta.noUpdateTitle) document.title = to.meta.title
    if(to.meta.auth){
        isLogged().then(response => {
            if(!response) {
                next({name: 'homepage'})
            }
        })
    }
    next()
})

export default router