/**
 * Company model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Company = require('../../sqldb').Company;
var CompanyEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CompanyEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Company.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    CompanyEvents.emit(event + ':' + doc._id, doc);
    CompanyEvents.emit(event, doc);
    done(null);
  };
}

exports.default = CompanyEvents;
//# sourceMappingURL=company.events.js.map
