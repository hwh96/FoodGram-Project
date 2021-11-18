const router = require('express').Router();
const Controller = require('../controllers/user-controller')
const profile = require('./profile');
const post = require('./post')


router.get('/', Controller.home)
router.post('/', Controller.login)
router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)
router.get('/logout', Controller.getLogOut)
router.get('/newProfile/:id', Controller.getNewProfile)
router.post('/newProfile/:id', Controller.postNewProfile)

router.use(function(req, res, next) {
    console.log(req.session);
    const error = `Please Login or Create new Account`
    if(!req.session) {
        res.redirect(`/?error=${error}`)
    } else {
        next()
    }
})

router.use('/post', post)
router.use('/profile', profile)

module.exports = router;