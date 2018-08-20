<template>
    <div>
        <v-btn @click="testInsert">
            Test insertion
        </v-btn>
    </div>
</template>

<script>
    import {Meteor} from 'meteor/meteor'

    export default {
        name: 'Chat',
        methods: {
            testInsert () {
                Meteor.call('messages.add', {
                    content: 'Test insertion'
                })
            }
        }
    }
</script>