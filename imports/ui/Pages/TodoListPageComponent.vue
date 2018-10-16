<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-form @submit.prevent="addTask" v-if="user">
                    <v-text-field label="Ajouter un tâche" v-model="newTask" required></v-text-field>
                </v-form>
                <v-checkbox color="primary" label="Cacher tâches complétées" v-model="hideCompletedTask"></v-checkbox>
                <v-card>
                    <v-toolbar color="primary" class="white--text card-header">
                        <v-toolbar-title><h1>Todo List ({{ incompleteCount }})</h1></v-toolbar-title>
                    </v-toolbar>
                    <v-list>
                        <template v-for="(task, index) in filteredTasks">
                            <Task :task="task"></Task>
                            <v-divider v-if="index < filteredTasks.length - 1"></v-divider>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { TasksCollection } from '/imports/api/tasks'
    import Task from '../Components/TodoList/TaskComponent'
    import { mapGetters } from 'vuex'
    import { Meteor } from 'meteor/meteor'

    export default {
        meteor: {
            $subscribe: {
                'tasks': []
            },
            tasks () {
                return TasksCollection.find({}, { sort: { createdAt: 1 } })
            },
            incompleteCount () {
                return TasksCollection.find({ checked: { $ne: true } }).count()
            }
        },
        data () {
            return {
                newTask : '',
                hideCompletedTask: false
            }
        },
        computed: {
            filteredTasks () {
                let filteredTasks = this.tasks
                if (this.hideCompletedTask) {
                    filteredTasks = filteredTasks.filter(task => !task.checked)
                }
                return filteredTasks
            },
            ...mapGetters([
                'user'
            ])
        },
        methods: {
            addTask () {
                Meteor.call('tasks.insert', this.newTask.trim())

                this.newTask = ''
            }
        },
        components: { Task }
    }
</script>