<template>
    <v-container grid-list-md>
        <v-layout row>
            <v-flex xs12 md4 v-if="!(this.$route.name === 'conversation' && ['xs','sm'].includes($mq))">
                <ListeConversations></ListeConversations>
            </v-flex>
            <v-flex xs12 md8 v-if="this.$route.name === 'conversation' && $subReady.users">
                <Conversation></Conversation>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import ListeConversations from '../Components/Chat/ListeConversationsComponent'
    import Conversation from '../Components/Chat/ConversationComponent'
    import { Meteor } from 'meteor/meteor'

    export default {
        meteor: {
            $subscribe: {
                'users': []
            },
            users () {
                return Meteor.users.find({ _id : { $ne : Meteor.userId() } }).fetch()
            }
        },
        watch: {
            '$subReady.users' (isReady) {
                if(isReady){
                    this.$store.dispatch('loadConversations', this.users)
                }
            },
        },
        components: { ListeConversations, Conversation }
    }
</script>