import SimpleSchema from 'simpl-schema'
import { Meteor } from 'meteor/meteor'

const UserSchema = {};

UserSchema.UserProfile = new SimpleSchema({
    prenom: {
        type: String,
        optional: true,
        max: 50
    },
    nom: {
        type: String,
        optional: true,
        max: 50
    },
});

UserSchema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true,
        min: 4,
        max: 20
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.EmailWithTLD
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: UserSchema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
})

Meteor.users.attachSchema(UserSchema.User)

if (Meteor.isServer) {
    Meteor.publish('users', function () {
        return Meteor.users.find({},{
            fields : {
                _id: 1,
                username: 1,
                profile: 1
            }
        })
    })
}