var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', user.register)
router.post('/verify',user.verification )
router.post('/login', user.login)
router.post('/logOut',user.logOut)
router.post('/sendMail',user.sendMail)
module.exports = router;
