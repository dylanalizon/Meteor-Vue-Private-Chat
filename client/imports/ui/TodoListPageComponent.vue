<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-form @submit.prevent="addTask">
                <v-text-field label="Ajouter un tâche" v-model="newTask" required></v-text-field>
            </v-form>
            <v-card>
                <v-toolbar color="primary" class="white--text">
                    <v-toolbar-title><h1>Todo List</h1></v-toolbar-title>
                </v-toolbar>
                <v-list>
                    <template v-for="(task, index) in tasks">
                        <v-list-tile>
                            <v-list-tile-action>
                                <v-checkbox color="primary" @change="toggleChecked(task)" v-model="task.checked"></v-checkbox>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                {{ task.text }}
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon @click="removeTask(task._id)">
                                    <v-icon>delete_outline</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-divider v-if="index < tasks.length - 1"></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import { TasksCollection } from '/lib/api/tasks'

    export default {
        name: 'TodoList',
        data () {
            return {
                newTask : ''
            }
        },
        meteor: {
            tasks () {
                return TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
            }
        },
        methods: {
            addTask () {
                TasksCollection.insert({
                    text: this.newTask,
                    createdAt: new Date(),
                    checked: false
                })

                this.newTask = ''
            },
            removeTask (idTask) {
                console.log('test')
                TasksCollection.remove(idTask)
            },
            toggleChecked (task) {
                TasksCollection.update(task._id, {
                    $set: { checked: task.checked },
                })
            }
        }
    }
</script>