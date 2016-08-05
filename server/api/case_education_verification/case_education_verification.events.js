/**
 * CaseEducationVerification model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var CaseEducationVerification = require('../../sqldb').CaseEducationVerification;
var CaseEducationVerificationEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CaseEducationVerificationEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CaseEducationVerification.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    CaseEducationVerificationEvents.emit(event + ':' + doc._id, doc);
    CaseEducationVerificationEvents.emit(event, doc);
    done(null);
  };
}

exports.default = CaseEducationVerificationEvents;
//# sourceMappingURL=case_education_verification.events.js.map
