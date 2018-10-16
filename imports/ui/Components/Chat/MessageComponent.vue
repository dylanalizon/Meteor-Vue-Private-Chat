<template>
    <v-layout row>
        <v-flex xs10 :class="cls">
            <p>
                <span class="auteur">{{ name }}</span>
                <span class="message-date">{{ ago }}</span>
            </p>
            <nl2br tag="p" :text="message.content" />
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Nl2br from 'vue-nl2br'

    export default {
        props: {
            message: Object,
            with: String
        },
        computed: {
            ...mapGetters(['user']),
            isMe () {
                return this.message.from === this.user._id
            },
            cls () {
                let cls = [];
                if(this.isMe){
                    cls.push('offset-xs2 text-xs-right')
                }
                return cls;
            },
            name () {
                return this.isMe ? 'Moi' : this.with
            },
            ago () {
                return moment(this.message.createdAt).fromNow()
            }
        },
        components: { Nl2br }
    }
</script>