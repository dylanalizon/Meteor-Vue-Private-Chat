<template>
    <div>
        <v-navigation-drawer clipped fixed v-model="drawer" app color="primary">
            <v-list dense>
                <router-link to="/" tag="v-list-tile">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </router-link>
                <router-link to="/chat" tag="v-list-tile">
                    <v-list-tile-action>
                        <v-icon>chat</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Chat</v-list-tile-title>
                    </v-list-tile-content>
                </router-link>
                <router-link to="/todo-list" tag="v-list-tile">
                    <v-list-tile-action>
                        <v-icon>check_box</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Todo list</v-list-tile-title>
                    </v-list-tile-content>
                </router-link>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left class="primary white--text">
            <v-toolbar-side-icon @click.stop="drawer = !drawer" class="white--text"></v-toolbar-side-icon>
            <v-toolbar-title>Meteor Application</v-toolbar-title>
            <v-spacer></v-spacer>
            <span v-if="user">
                {{ user.username }}!
            </span>
            <v-menu v-if="!user" :close-on-content-click="false" :nudge-bottom="15" lazy origin="top right" offset-y>
                <v-btn slot="activator" icon large class="white--text">
                    <v-avatar size="32px" tile>
                        <i class="material-icons">
                            account_circle
                        </i>
                    </v-avatar>
                </v-btn>
                <v-card>
                    <v-tabs v-model="activeTab" slider-color="primary" fixed-tabs>
                        <v-tab>
                            Se connecter
                        </v-tab>
                        <v-tab>
                            S'inscrire
                        </v-tab>
                        <v-tab-item>
                            <login></login>
                        </v-tab-item>
                        <v-tab-item>
                            <register></register>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-menu>
            <v-menu v-else :nudge-bottom="15" :value="false" lazy origin="top right" offset-y>
                <v-btn slot="activator" icon large class="white--text">
                    <v-avatar size="32px" tile>
                        <i class="material-icons">
                            account_circle
                        </i>
                    </v-avatar>
                </v-btn>
                <v-list>
                    <v-list-tile @click="logout">
                        <v-list-tile-title>Se déconnecter</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
    </div>
</template>

<script>
    import Login from './Users/LoginComponent'
    import Register from './Users/RegisterComponent'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Navigation',
        data () {
            return {
                drawer: null,
                activeTab: null
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        methods: {
            logout () {
                this.$store.dispatch('logout')
            }
        },
        components: { Login, Register }
    }
</script>