<template>
    <router-link :to="{name: 'conversation', params: {username: conversation.username}}" tag="v-list-tile">
        <v-list-tile-content>
            {{ conversation.profile.prenom }} {{ conversation.profile.nom }}
        </v-list-tile-content>
        <v-list-tile-action v-if="countUnreadMessages > 0">
            <v-badge left>
                <span slot="badge">{{ countUnreadMessages }}</span>
            </v-badge>
        </v-list-tile-action>
    </router-link>
</template>

<script>
    import {MessagesCollection} from '../../../api/messages'
    import { Meteor } from 'meteor/meteor'

    export default {
        meteor: {
            unreadMessages () {
                return MessagesCollection.find({
                    to: Meteor.userId(),
                    from: this.conversation._id,
                    readAt: null
                })
            }
        },
        props: {
            conversation: {}
        },
        computed: {
            countUnreadMessages () {
                return this.unreadMessages.length
            }
        }
    }
</script>