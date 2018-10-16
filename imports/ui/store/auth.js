import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import router from '/imports/ui/configs/vue-router.config'
import isLogged from '../../helpers/isLogged'

export default {
    state: {
        user: null
    },
    getters: {
        user: state => {
            return state.user
        }
    },
    mutations: {
        setUser (state, value) {
            state.user = value
        }
    },
    actions: {
        updateUser (context) {
            isLogged().then(response => {
                if (response) {
                    this.commit('setUser', Meteor.user())
                }
            })
        },
        submitRegisterForm (context, formData) {
            Accounts.createUser(formData, error => {
                if(error){
                    console.log(error)
                }else{
                    this.commit('setUser', Meteor.user())
                }
            })
        },
        submitLoginForm (context, formData) {
            Meteor.loginWithPassword(formData.username, formData.password, error => {
                if (error) {
                    this.dispatch('sendNotification', {
                        title: 'Erreur',
                        text: 'Nom d\'utilisateur ou mot de passe incorrect',
                        type: 'error'
                    })
                } else {
                    this.dispatch('sendNotification', {
                        text: 'Vous êtes bien connecté',
                        type: 'success'
                    })
                    this.commit('setUser', Meteor.user())
                }
            })
        },
        logout () {
            Meteor.logout(() => {
                if(router.currentRoute.meta.auth){
                    router.push({name: 'homepage'})
                }
                this.dispatch('sendNotification', {
                    text: 'Vous êtes bien déconnecté',
                    type: 'success'
                })
                this.commit('setUser', null)
            })
        }
    }
}