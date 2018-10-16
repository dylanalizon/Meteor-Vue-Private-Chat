import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export const MessagesCollection = new Mongo.Collection('messages')

if (Meteor.isServer) {
    Meteor.publish('conversationWith', function (withId) {
        return MessagesCollection.find({
            $or: [
                { from: this.userId, to: withId },
                { from: withId, to: this.userId }
            ],
        })
    })
    Meteor.publish('newMessage', function () {
        return MessagesCollection.find({
            to: this.userId,
            createdAt: { $gte: new Date() }
        })
    })
    Meteor.publish('unreadMessages', function () {
        return MessagesCollection.find({
            to: this.userId,
            readAt: null
        }, {
            fields: { _id: 1, to: 1, from: 1 }
        })
    })
}

const MessageSchema = {}

MessageSchema.Message = new SimpleSchema({
    from: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
           return this.isInsert ? this.userId : this.unset()
        }
    },
    to: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    content: {
        type: String
    },
    readAt: {
        type: Date,
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            return this.isInsert ? new Date() : this.unset()
        }
    }
})

MessagesCollection.attachSchema(MessageSchema.Message)

Meteor.methods({
    'messages.insert': function (document) {
        MessagesCollection.insert(document);
    },
    'messages.readConversation': function (withId) {
        MessagesCollection.update(
            { from: withId, to: this.userId },
            { $set: { readAt: new Date() } },
            { multi: true })
    },
    'messages.read': function (messageId) {
        MessagesCollection.update(
            { _id: messageId},
            { $set: { readAt: new Date() } })
    }
})