const router = require('express').Router();
router.use('/', (req, res) => {
	res.send("This is a api")
})

module.exports = {
  test: require('./test'),
	defaults: router
};
