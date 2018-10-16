<template>
    <v-card>
        <v-toolbar color="primary" class="white--text card-header">
            <v-toolbar-title>Conversations</v-toolbar-title>
        </v-toolbar>
        <v-list>
            <Destinataire :conversation="conversation" v-for="conversation in conversations" :key="conversation._id"></Destinataire>
        </v-list>
    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Destinataire from './DestinaraireComponent'

    export default {
        computed: {
            ...mapGetters(['conversations'])
        },
        components: { Destinataire }
    }
</script>