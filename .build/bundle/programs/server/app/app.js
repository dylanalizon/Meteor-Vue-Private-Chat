var require = meteorInstall({"lib":{"api":{"messages.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// lib/api/messages.js                                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.export({
  MessagesCollection: () => MessagesCollection
});
let Mongo;
module.watch(require("meteor/mongo"), {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
const MessagesCollection = new Mongo.Collection('messages');
Meteor.methods({
  'messages.add': function (document) {
    MessagesCollection.insert(document);
  }
});
///////////////////////////////////////////////////////////////////////

},"tasks.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// lib/api/tasks.js                                                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.export({
  TasksCollection: () => TasksCollection
});
let Mongo;
module.watch(require("meteor/mongo"), {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const TasksCollection = new Mongo.Collection('tasks');
///////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/main.js                                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
module.watch(require("/lib/api/messages"));
module.watch(require("/lib/api/tasks.js"));
Meteor.startup(() => {});
///////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".vue"
  ]
});
var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvbGliL2FwaS9tZXNzYWdlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvbGliL2FwaS90YXNrcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0IiwiTWVzc2FnZXNDb2xsZWN0aW9uIiwiTW9uZ28iLCJ3YXRjaCIsInJlcXVpcmUiLCJ2IiwiTWV0ZW9yIiwiQ29sbGVjdGlvbiIsIm1ldGhvZHMiLCJkb2N1bWVudCIsImluc2VydCIsIlRhc2tzQ29sbGVjdGlvbiIsInN0YXJ0dXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUFBLE9BQU9DLE1BQVAsQ0FBYztBQUFDQyxzQkFBbUIsTUFBSUE7QUFBeEIsQ0FBZDtBQUEyRCxJQUFJQyxLQUFKO0FBQVVILE9BQU9JLEtBQVAsQ0FBYUMsUUFBUSxjQUFSLENBQWIsRUFBcUM7QUFBQ0YsUUFBTUcsQ0FBTixFQUFRO0FBQUNILFlBQU1HLENBQU47QUFBUTs7QUFBbEIsQ0FBckMsRUFBeUQsQ0FBekQ7QUFBNEQsSUFBSUMsTUFBSjtBQUFXUCxPQUFPSSxLQUFQLENBQWFDLFFBQVEsZUFBUixDQUFiLEVBQXNDO0FBQUNFLFNBQU9ELENBQVAsRUFBUztBQUFDQyxhQUFPRCxDQUFQO0FBQVM7O0FBQXBCLENBQXRDLEVBQTRELENBQTVEO0FBR3JJLE1BQU1KLHFCQUFxQixJQUFJQyxNQUFNSyxVQUFWLENBQXFCLFVBQXJCLENBQTNCO0FBRVBELE9BQU9FLE9BQVAsQ0FBZTtBQUNYLGtCQUFnQixVQUFVQyxRQUFWLEVBQW9CO0FBQ2hDUix1QkFBbUJTLE1BQW5CLENBQTBCRCxRQUExQjtBQUNIO0FBSFUsQ0FBZixFOzs7Ozs7Ozs7OztBQ0xBVixPQUFPQyxNQUFQLENBQWM7QUFBQ1csbUJBQWdCLE1BQUlBO0FBQXJCLENBQWQ7QUFBcUQsSUFBSVQsS0FBSjtBQUFVSCxPQUFPSSxLQUFQLENBQWFDLFFBQVEsY0FBUixDQUFiLEVBQXFDO0FBQUNGLFFBQU1HLENBQU4sRUFBUTtBQUFDSCxZQUFNRyxDQUFOO0FBQVE7O0FBQWxCLENBQXJDLEVBQXlELENBQXpEO0FBRXhELE1BQU1NLGtCQUFrQixJQUFJVCxNQUFNSyxVQUFWLENBQXFCLE9BQXJCLENBQXhCLEM7Ozs7Ozs7Ozs7O0FDRlAsSUFBSUQsTUFBSjtBQUFXUCxPQUFPSSxLQUFQLENBQWFDLFFBQVEsZUFBUixDQUFiLEVBQXNDO0FBQUNFLFNBQU9ELENBQVAsRUFBUztBQUFDQyxhQUFPRCxDQUFQO0FBQVM7O0FBQXBCLENBQXRDLEVBQTRELENBQTVEO0FBQStETixPQUFPSSxLQUFQLENBQWFDLFFBQVEsbUJBQVIsQ0FBYjtBQUEyQ0wsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLG1CQUFSLENBQWI7QUFJckhFLE9BQU9NLE9BQVAsQ0FBZSxNQUFNLENBRXBCLENBRkQsRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ28gfSBmcm9tICdtZXRlb3IvbW9uZ28nXG5pbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJ1xuXG5leHBvcnQgY29uc3QgTWVzc2FnZXNDb2xsZWN0aW9uID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ21lc3NhZ2VzJylcblxuTWV0ZW9yLm1ldGhvZHMoe1xuICAgICdtZXNzYWdlcy5hZGQnOiBmdW5jdGlvbiAoZG9jdW1lbnQpIHtcbiAgICAgICAgTWVzc2FnZXNDb2xsZWN0aW9uLmluc2VydChkb2N1bWVudCk7XG4gICAgfVxufSkiLCJpbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5cbmV4cG9ydCBjb25zdCBUYXNrc0NvbGxlY3Rpb24gPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigndGFza3MnKTsiLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJ1xuaW1wb3J0ICcvbGliL2FwaS9tZXNzYWdlcydcbmltcG9ydCAnL2xpYi9hcGkvdGFza3MuanMnXG5cbk1ldGVvci5zdGFydHVwKCgpID0+IHtcblxufSk7XG4iXX0=
