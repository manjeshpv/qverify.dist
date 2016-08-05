/**
 * Manager model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Manager = require('../../sqldb').Manager;
var ManagerEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ManagerEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Manager.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    ManagerEvents.emit(event + ':' + doc._id, doc);
    ManagerEvents.emit(event, doc);
    done(null);
  };
}

exports.default = ManagerEvents;
//# sourceMappingURL=manager.events.js.map
