'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var AuthCode = require('../../sqldb').AuthCode; /**
                                                 * AuthCode model events
                                                 */

var AuthCodeEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
AuthCodeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  AuthCode.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    AuthCodeEvents.emit(event + ':' + doc._id, doc);
    AuthCodeEvents.emit(event, doc);
    done(null);
  };
}

exports.default = AuthCodeEvents;
//# sourceMappingURL=authCode.events.js.map
