/**
 * Allocation model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Allocation = require('../../sqldb').Allocation;
var AllocationEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
AllocationEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Allocation.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    AllocationEvents.emit(event + ':' + doc._id, doc);
    AllocationEvents.emit(event, doc);
    done(null);
  };
}

exports.default = AllocationEvents;
//# sourceMappingURL=allocation.events.js.map
