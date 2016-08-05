/**
 * AllocationStatus model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var AllocationStatus = require('../../sqldb').AllocationStatus;
var AllocationStatusEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
AllocationStatusEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  AllocationStatus.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    AllocationStatusEvents.emit(event + ':' + doc._id, doc);
    AllocationStatusEvents.emit(event, doc);
    done(null);
  };
}

exports.default = AllocationStatusEvents;
//# sourceMappingURL=allocation_status.events.js.map
