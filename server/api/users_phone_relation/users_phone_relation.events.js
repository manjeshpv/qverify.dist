/**
 * UsersPhoneRelation model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var UsersPhoneRelation = require('../../sqldb').UsersPhoneRelation;
var UsersPhoneRelationEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
UsersPhoneRelationEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UsersPhoneRelation.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    UsersPhoneRelationEvents.emit(event + ':' + doc._id, doc);
    UsersPhoneRelationEvents.emit(event, doc);
    done(null);
  };
}

exports.default = UsersPhoneRelationEvents;
//# sourceMappingURL=users_phone_relation.events.js.map
