/**
 * Pin model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Pin = require('../../sqldb').Pin;
var PinEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PinEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Pin.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    PinEvents.emit(event + ':' + doc._id, doc);
    PinEvents.emit(event, doc);
    done(null);
  };
}

exports.default = PinEvents;
//# sourceMappingURL=pin.events.js.map
