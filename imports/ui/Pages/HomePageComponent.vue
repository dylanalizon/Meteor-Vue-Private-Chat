<template>
    <v-container>
        <h1>{{ greeting }}</h1>

        <v-btn @click="count" color="primary">
            Click me !
        </v-btn>

        <p>
            You've clicked: {{ counter }} times.
        </p>
    </v-container>
</template>

<script>
    export default {
        name: 'Home',
        data () {
            return {
                greeting: 'Hello Meteor-vue World',
                counter: 0
            }
        },
        methods: {
            count () {
                this.counter++
            }
        }
    }
</script>