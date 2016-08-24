/**
 * State model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var State = require('../../sqldb').State;
var StateEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
StateEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  State.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    StateEvents.emit(event + ':' + doc._id, doc);
    StateEvents.emit(event, doc);
    done(null);
  };
}

exports.default = StateEvents;
//# sourceMappingURL=state.events.js.map
