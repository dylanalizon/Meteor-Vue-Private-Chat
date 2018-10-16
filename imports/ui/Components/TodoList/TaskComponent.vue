<template>
    <v-list-tile>
        <v-list-tile-action>
            <v-btn icon class="bouton-icone" @click="toggleChecked">
                <v-icon v-if="task.checked">done</v-icon>
            </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>{{ task.text }}</v-list-tile-title>
            <v-list-tile-sub-title>par {{ task.username }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="isMine">
            <v-btn icon @click="togglePrivate">
                <v-icon v-if="!task.private">lock_open</v-icon>
                <v-icon v-else>lock</v-icon>
            </v-btn>
        </v-list-tile-action>
        <v-list-tile-action>
            <v-btn icon @click="removeTask">
                <v-icon>delete</v-icon>
            </v-btn>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script>
    import { Meteor } from 'meteor/meteor'
    import { mapGetters } from 'vuex'

    export default {
        props: {
            task: Object
        },
        computed: {
            isMine () {
                if(this.user) {
                    return this.user.username === this.task.username
                } else {
                    return false
                }
            },
            ...mapGetters([
                'user'
            ])
        },
        methods: {
            removeTask () {
                Meteor.call('tasks.remove', this.task._id)
            },
            toggleChecked () {
                Meteor.call('tasks.setChecked', this.task._id, !this.task.checked)
            },
            togglePrivate () {
                Meteor.call('tasks.setPrivate', this.task._id, !this.task.private)
            }
        }
    }
</script>