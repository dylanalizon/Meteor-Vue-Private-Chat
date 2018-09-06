import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const MessagesCollection = new Mongo.Collection('messages')

Meteor.methods({
    'messages.add': function (document) {
        MessagesCollection.insert(document);
    }
})