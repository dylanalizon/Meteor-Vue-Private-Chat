<template>
    <v-card class="pa-3">
        <form @submit.prevent="submitForm">
            <v-text-field v-model="formData.username" label="Nom d'utilisateur" :rules="rules.username" required></v-text-field>
            <v-text-field v-model="formData.email" label="Email" :rules="rules.email" required></v-text-field>
            <v-text-field v-model="formData.profile.nom" label="Nom" :rules="rules.nom" required></v-text-field>
            <v-text-field v-model="formData.profile.prenom" label="Prénom" :rules="rules.prenom" required></v-text-field>
            <v-text-field v-model="formData.password" label="Mot de passe" type="password" :rules="rules.password" required></v-text-field>
            <v-btn color="primary" type="submit">S'inscrire</v-btn>
        </form>
    </v-card>
</template>

<script>
    import SimpleSchema from 'simpl-schema'
    export default {
        name: 'Register',
        data() {
            return {
                formData: {
                    username: '',
                    email: '',
                    profile: {
                        nom: '',
                        prenom: '',
                        autre: ''
                    },
                    password: ''
                },
                rules: {
                    username: [
                        v => !!v || 'Le nom d\'utilisateur est requis',
                        v => (v && v.length <= 20) || 'Le nom d\'utilisateur doit faire moins de 20 caractères',
                        v => (v && v.length >= 4) || 'Le nom d\'utilisateur doit faire plus de 3 caractères'
                    ],
                    email: [
                        v => !!v || 'L\'adresse email est requise',
                        v => SimpleSchema.RegEx.EmailWithTLD.test(v) || 'L\'adresse email n\'est pas valide'
                    ],
                    nom: [
                        v => !!v || 'Le nom est requis',
                        v => (v && v.length <= 50) || 'Votre nom doit faire moins de 50 caractères'
                    ],
                    prenom: [
                        v => !!v || 'Le prénom est requis',
                        v => (v && v.length <= 50) || 'Votre prénom doit faire moins de 50 caractères'
                    ],
                    password: [
                        v => !!v || 'Le mot de passe est requis',
                        v => (v && v.length >= 4) || 'Votre mot de passe doit faire plus de 3 caractères'
                    ]
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