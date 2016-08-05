/**
 * Status model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Status = require('../../sqldb').Status;
var StatusEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
StatusEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Status.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    StatusEvents.emit(event + ':' + doc._id, doc);
    StatusEvents.emit(event, doc);
    done(null);
  };
}

exports.default = StatusEvents;
//# sourceMappingURL=status.events.js.map
