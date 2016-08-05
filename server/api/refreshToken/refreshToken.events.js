'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var RefreshToken = require('../../sqldb').RefreshToken; /**
                                                         * RefreshToken model events
                                                         */

var RefreshTokenEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
RefreshTokenEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  RefreshToken.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    RefreshTokenEvents.emit(event + ':' + doc._id, doc);
    RefreshTokenEvents.emit(event, doc);
    done(null);
  };
}

exports.default = RefreshTokenEvents;
//# sourceMappingURL=refreshToken.events.js.map
