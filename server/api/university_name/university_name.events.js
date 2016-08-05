/**
 * UniversityName model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var UniversityName = require('../../sqldb').UniversityName;
var UniversityNameEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
UniversityNameEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UniversityName.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    UniversityNameEvents.emit(event + ':' + doc._id, doc);
    UniversityNameEvents.emit(event, doc);
    done(null);
  };
}

exports.default = UniversityNameEvents;
//# sourceMappingURL=university_name.events.js.map
