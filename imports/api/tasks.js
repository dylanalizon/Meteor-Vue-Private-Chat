import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'

export const TasksCollection = new Mongo.Collection('tasks')

if (Meteor.isServer) {
    Meteor.publish('tasks', function tasksPublication() {
        return TasksCollection.find({
            $or: [
                { private: { $ne: true } },
                { id_user: this.userId },
            ],
        })
    })
}

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String)
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        TasksCollection.insert({
            text,
            createdAt: new Date(),
            checked: false,
            private: false,
            id_user: this.userId,
            username: Meteor.users.findOne(this.userId).username
        })
    },
    'tasks.remove'(taskId) {
        check(taskId, String)

        const task = TasksCollection.findOne(taskId);
        if (task.private && task.id_user !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        TasksCollection.remove(taskId)
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        const task = TasksCollection.findOne(taskId);
        if (task.private && task.id_user !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        TasksCollection.update(taskId, { $set: { checked: setChecked } })
    },
    'tasks.setPrivate'(taskId, setPrivate) {
        check(taskId, String);
        check(setPrivate, Boolean);

        const task = TasksCollection.findOne(taskId);
        if (task.id_user !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        TasksCollection.update(taskId, { $set: { private: setPrivate } });
    }
});