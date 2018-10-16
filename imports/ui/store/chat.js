import Vue from 'vue'

export default {
    state: {
        conversations: {},
        openedConversation: [],
    },
    getters: {
        conversation: function (state) {
            return function (username) {
                return state.conversations[username] || {}
            }
        },
        conversations: function (state) {
            return state.conversations
        }
    },
    mutations: {
        setConversations: function (state, {conversations}) {
            conversations.forEach(function(c){
                let conversation = state.conversations[c.username] || {}
                conversation = {...conversation, ...c}
                state.conversations = {...state.conversations, ...{[c.username]: conversation}}
            })
        },
        openConversation: function (state, username) {
            state.openedConversation = [username]
        }
    },
    actions: {
        loadConversations: function (context, conversations) {
            context.commit('setConversations', { conversations })
        },
        loadMessages: function (context, username){
            context.commit('openConversation', username)
        }
    }
}