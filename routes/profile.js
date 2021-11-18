const router = require('express').Router();
const Controller = require('../controllers/user-controller')

router.get('/:id', Controller.profile)
router.get('/:id/edit', Controller.getEditProfile)
router.post('/:id/edit', Controller.postEditProfile)

module.exports = router;