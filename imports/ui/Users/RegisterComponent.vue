<template>
    <v-card class="pa-3">
        <form @submit.prevent="submitForm">
            <v-text-field id="register-user-name" v-model="formData.username" name="username" label="Nom d'utilisateur"></v-text-field>
            <v-text-field id="e-mail" v-model="formData.email" name="email" label="Email"></v-text-field>
            <v-text-field id="register-password" v-model="formData.password" name="password" label="Mot de passe" type="password"></v-text-field>
            <v-btn color="primary" type="submit">S'inscrire</v-btn>
        </form>
    </v-card>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                formData: {
                    username: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            submitForm() {
                this.$store.dispatch('submitRegisterForm', this.formData)
            }
        }
    }
</script>