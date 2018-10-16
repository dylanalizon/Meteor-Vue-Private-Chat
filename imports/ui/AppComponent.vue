<template>
    <v-app>
        <Navigation :unread="countUnreadMessages"></Navigation>

        <v-content>
            <transition :name="transitionName" :mode="modeName">
                <router-view :key="key"></router-view>
            </transition>
        </v-content>

        <notifications position="bottom right">
            <template slot="body" slot-scope="props">
                <div :class="notifyClass(props.item)" @click="openNotification(props.item)">
                    <div v-if="props.item.title" class="notification-title" v-html="props.item.title">
                    </div>
                    <div class="notification-content" v-html="props.item.text">
                    </div>
                </div>
            </template>
        </notifications>
    </v-app>
</template>

<script>
    import Navigation from './NavigationComponent'
    import {MessagesCollection} from '../api/messages'
    import { Meteor } from 'meteor/meteor'

    const STATE_NOTIFICATION = {
        IDLE: 0,
        DESTROYED: 2
    }

    export default {
        meteor: {
            $subscribe: {
                'newMessage': [],
                'users': [],
                'unreadMessages': []
            },
            unreadMessages () {
                return MessagesCollection.find({
                    to: Meteor.userId(),
                    readAt: null
                })
            }
        },
        data () {
          return {
              transitionName: 'fade',
              modeName: 'out-in'
          }
        },
        computed: {
            key() {
                return this.$route.meta.key !== undefined ? this.$route.meta.key : this.$route.name
            },
            countUnreadMessages () {
                return this.$subReady.unreadMessages ? this.unreadMessages.length : 0
            }
        },
        mounted () {
            //Configuration router(ne fonctionne pas au premier chargement de la page)
            this.$router.beforeEach((to, from, next) => {
                this.setTransition(to, from)

                if(!to.meta.noUpdateTitle) {
                    this.$store.commit('setTitle', to.meta.title)
                    this.$store.dispatch('changeTitle')
                }
                
                next()
            })
            this.$store.commit('setTitle', document.title)
            this.$store.dispatch('updateUser')
        },
        watch: {
            '$subReady.newMessage': function (isReady) {
                if (isReady) {
                    MessagesCollection.find({
                        to: Meteor.userId(),
                        createdAt: { $gte: new Date() }
                    }).observeChanges({
                        added: (id, fields) => {
                            let from = Meteor.users.findOne(
                                { _id: fields.from },
                                { fields: {
                                        'username': 1,
                                        'profile.nom': 1,
                                        'profile.prenom': 1
                                    }
                                })
                            let fromString = from.profile.prenom+' '+from.profile.nom
                            //Si utilisateur n'est pas dans la conversation
                            if (!(this.$route.name === 'conversation' && this.$route.params.username === from.username)) {
                                this.$store.dispatch('sendNotification', {
                                    title: 'Nouveau message de '+fromString,
                                    text: fields.content,
                                    type: 'success',
                                    duration: 10000,
                                    data: {
                                        link: {name: 'conversation', params: {username: from.username}}
                                    }
                                })
                            } else {
                                //Si l'utilisateur est dans la conversation
                                Meteor.call('messages.read', id)
                            }
                        }
                    })
                }
            },
            countUnreadMessages: function (count) {
                this.$store.commit('setCountNotifications', count)
                this.$store.dispatch('changeTitle')
            }
        },
        methods: {
            notifyClass (item) {
                return [
                    'notification',
                    'vue-notification',
                    item.type
                ]
            },
            openNotification (item) {
                clearTimeout(item.timer)
                item.state = STATE_NOTIFICATION.DESTROYED
                if (item.data.link) {
                    this.$router.push(item.data.link)
                }
            },
            setTransition (to, from) {
                const toDepth = to.path.split('/')
                const fromDepth = from.path.split('/')
                if (toDepth[1] === fromDepth[1]) {
                    if (toDepth.length < fromDepth.length) {
                        this.transitionName = 'slide-right'
                        this.modeName = ''
                    }else if (toDepth.length > fromDepth.length){
                        this.transitionName = 'slide-left'
                        this.modeName = ''
                    }
                }else{
                    this.transitionName = 'fade'
                    this.modeName = 'out-in'
                }

                if (!['xs','sm'].includes(this.$mq) &&
                    ((to.name === 'chat' && from.name === 'conversation') ||
                        (to.name === 'conversation' && from.name === 'chat'))) {
                    this.modeName = 'out-in'
                    this.transitionName = ''
                }
            }
        },
        components: { Navigation }
    }
</script>