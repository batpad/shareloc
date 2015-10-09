var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {
	var url = req.params[0];
    res.render('index', { url: url });
});

module.exports = router;
