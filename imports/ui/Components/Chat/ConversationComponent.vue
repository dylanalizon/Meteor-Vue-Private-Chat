<template>
    <v-card>
        <v-toolbar color="primary" class="white--text card-header">
            <v-btn :to="{name: 'chat'}" icon v-if="['xs','sm'].includes($mq)" exact>
                <v-icon class="white--text">chevron_left</v-icon>
            </v-btn>
            <v-toolbar-title>{{ toUser }}</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <div class="messages">
                <Message :message="message" v-if="$subReady.conversationWith" :with="toUser" v-for="message in messages" :key="message._id"></Message>
            </div>
            <div class="envoyer-message">
                <v-textarea name="textarea-message" v-model="message" placeholder="Ecrivez votre message..." rows="1" auto-grow class="envoyer-message-textarea" @keypress.enter="sendMessage"></v-textarea>
            </div>
        </v-container>
        <div class="conversation-loading" v-if="!$subReady.conversationWith">
            <div class="loader"></div>
        </div>
    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {MessagesCollection} from "../../../api/messages"
    import Message from './MessageComponent'
    import { Meteor } from 'meteor/meteor'

    export default {
        meteor: {
            messages () {
                return MessagesCollection.find({
                    $or: [
                        { from: Meteor.userId(), to: this.conversation._id },
                        { from: this.conversation._id, to: Meteor.userId() }
                    ]
                }, {
                    sort: { createdAt: 1 }
                })
            }
        },
        data () {
            return {
                message: '',
                loaded: false
            }
        },
        mounted () {
            this.loadMessages()
            this.$listeMessages = this.$el.querySelector('.messages')
        },
        computed: {
            ...mapGetters(['user']),
            conversation () {
                return this.$store.getters.conversation(this.$route.params.username)
            },
            toUser () {
                return this.conversation.profile.prenom+' '+this.conversation.profile.nom
            },
            lastMessage: function () {
                if (this.$subReady.conversationWith) {
                    return this.messages[this.messages.length - 1]
                } else {
                    return {}
                }
            }
        },
        watch: {
            '$route.params.username': function (username) {
                this.loadMessages()
            },
            '$subReady.conversationWith': function (isReady) {
                if (isReady) {
                    this.$store.dispatch('loadMessages', this.$route.params.username)
                    this.scrollToBottom()
                    this.loaded = true
                }
            },
            lastMessage: function () {
                this.scrollToBottom()
            }
        },
        methods: {
            loadMessages () {
                 this.$subscribe('conversationWith', [this.conversation._id])
                 Meteor.call('messages.readConversation', this.conversation._id,)
                 this.setTitle()
            },
            sendMessage (e) {
                if(e.shiftKey === false){
                    e.preventDefault()
                    Meteor.call('messages.insert', {
                        to: this.conversation._id,
                        content: this.message
                    })
                    document.querySelector('textarea[name="textarea-message"]').blur()
                    this.message = ''
                }
            },
            scrollToBottom () {
                this.$nextTick(() => {
                    this.$listeMessages.scrollTop = this.$listeMessages.scrollHeight
                })
            },
            setTitle () {
                document.title = this.toUser+' - '+this.$route.meta.title
                this.$store.commit('setTitle', document.title)
                this.$store.dispatch('changeTitle')
            }
        },
        components: { Message }
    }
</script>