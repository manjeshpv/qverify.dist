'use strict';

var express = require('express');
var controller = require('./case.controller');

var router = express.Router();

router.get('/vendor', controller.vendorUploaded);
router.get('/', controller.index);
router.get('/:id/getFile', controller.getFile);
router.get('/:id', controller.show);

router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
