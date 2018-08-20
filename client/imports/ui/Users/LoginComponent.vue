<template>
    <v-card class="pa-3">
        <form @submit.prevent="submitForm">
            <v-text-field id="login-user-name" v-model="formData.username" name="username" label="Nom d'utilisateur"></v-text-field>
            <v-text-field id="login-password" v-model="formData.password" name="password" label="Mot de passe" type="password"></v-text-field>
            <v-btn type="submit" color="primary">Se connecter</v-btn>
        </form>
    </v-card>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                formData: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            submitForm() {
                this.$store.dispatch('submitLoginForm', this.formData)
            }
        }
    }
</script>