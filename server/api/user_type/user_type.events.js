/**
 * UserType model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var UserType = require('../../sqldb').UserType;
var UserTypeEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
UserTypeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UserType.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    UserTypeEvents.emit(event + ':' + doc._id, doc);
    UserTypeEvents.emit(event, doc);
    done(null);
  };
}

exports.default = UserTypeEvents;
//# sourceMappingURL=user_type.events.js.map
