/**
 * CaseSiteVerification model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var CaseSiteVerification = require('../../sqldb').CaseSiteVerification;
var CaseSiteVerificationEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CaseSiteVerificationEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CaseSiteVerification.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    CaseSiteVerificationEvents.emit(event + ':' + doc._id, doc);
    CaseSiteVerificationEvents.emit(event, doc);
    done(null);
  };
}

exports.default = CaseSiteVerificationEvents;
//# sourceMappingURL=case_site_verification.events.js.map
