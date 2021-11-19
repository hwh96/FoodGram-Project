const router = require('express').Router();
const Controller = require ('../controllers/post-controller.js')


router.get('/newPost/:id', Controller.getNewPost)
router.post('/newPost/:id', Controller.postNewPost)
router.get('/timeLine', Controller.showALlPosts)
router.get('/deletePost/:id', Controller.deletePost)
router.get('/deletePost/:id', Controller.deletePost)


module.exports= router;