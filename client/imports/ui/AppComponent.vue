<template>
    <v-app>
        <Navigation></Navigation>

        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>

        <notifications position="bottom right"/>
    </v-app>
</template>

<script>
    import Navigation from './NavigationComponent'
    import { Meteor } from 'meteor/meteor'

    export default {
        name: 'App',
        data () {
            return {
                drawer: null
            }
        },
        meteor: {
            user () {
                if (Meteor.user()) {
                    this.$store.commit('updateUser', Meteor.user())
                }
            }
        },
        components: { Navigation }
    }
</script>