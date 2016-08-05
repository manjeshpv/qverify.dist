/**
 * CaseType model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var CaseType = require('../../sqldb').CaseType;
var CaseTypeEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CaseTypeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CaseType.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    CaseTypeEvents.emit(event + ':' + doc._id, doc);
    CaseTypeEvents.emit(event, doc);
    done(null);
  };
}

exports.default = CaseTypeEvents;
//# sourceMappingURL=case_type.events.js.map
