const {FoodPost, User} =require('../models/index')

class Controller {
    static getNewPost(req, res) {
        // res.render('add-post')
        let id = +req.params.id
        User.findByPk(id)
            .then(data => {
                res.render('add-post', {user: data})
            })
    }

    static postNewPost(req, res) {
        let id = +req.params.id
        let newPost = {
            foodName: req.body.foodName,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            location: req.body.location,
            UserId: id
        }

        FoodPost.create(newPost)
            .then(() => {
                res.redirect('/post/timeLine')
            })
    }

    static showALlPosts(req, res) {
        console.log(req.session, '>>>>>');
        FoodPost.findAll()
            .then(data => {
                // console.log(data);
                res.render('time-line', {post: data})
            })
    }

    static deletePost(req, res) {
        let id = +req.params.id

        FoodPost.destroy({
            where: {id: id}
        })
            .then(() => {
                res.redirect('/post/timeLine')
            })
    }
}

module.exports = Controller;