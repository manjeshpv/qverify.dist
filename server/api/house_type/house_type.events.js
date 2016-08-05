/**
 * HouseType model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var HouseType = require('../../sqldb').HouseType;
var HouseTypeEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
HouseTypeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  HouseType.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    HouseTypeEvents.emit(event + ':' + doc._id, doc);
    HouseTypeEvents.emit(event, doc);
    done(null);
  };
}

exports.default = HouseTypeEvents;
//# sourceMappingURL=house_type.events.js.map
