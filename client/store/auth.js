import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import Vue from 'vue'

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
        updateUser (state, value) {
            state.user = value
        }
    },
    actions: {
        submitRegisterForm (context, formData) {
            Accounts.createUser(formData, error => {
                error ? console.log(error.reason) : console.log('Utilisateur enregistré')
                this.commit('updateUser', Meteor.user())
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
                    this.commit('updateUser', Meteor.user())
                }
            })
        },
        logout () {
            Meteor.logout(() => {
                this.dispatch('sendNotification', {
                    text: 'Vous êtes bien déconnecté',
                    type: 'success'
                })
                this.commit('updateUser', null)
            })
        }
    }
}