/**
 * CaseCriminalVerification model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var CaseCriminalVerification = require('../../sqldb').CaseCriminalVerification;
var CaseCriminalVerificationEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CaseCriminalVerificationEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CaseCriminalVerification.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    CaseCriminalVerificationEvents.emit(event + ':' + doc._id, doc);
    CaseCriminalVerificationEvents.emit(event, doc);
    done(null);
  };
}

exports.default = CaseCriminalVerificationEvents;
//# sourceMappingURL=case_criminal_verification.events.js.map
