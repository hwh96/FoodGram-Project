const {User, Profile, FoodPost} = require('../models') 
const bcrypt = require('bcryptjs')

class Controller {
    static home(req, res) {
        const error = req.query.error
        res.render('landing-page', {error})
    }

    static login(req, res) {
        const {username, password} = req.body
        User.findOne({
            where: {
                username: username,
            }
        })
            .then(data => {
                if(data) {
                    const validPassword = bcrypt.compareSync(password, data.password)
                    if(validPassword) {
                        req.session.userId = data.id
                        return res.redirect(`/post/timeLine`)
                    } else {
                        const error = 'Invalid Username/Password'
                        return res.redirect(`/?error=${error}`)
                    }
                } else {
                    const error = 'Invalid Username/Password'
                    return res.redirect(`/?error=${error}`)
                }
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static getRegister(req, res) {
        res.render('new-account')
    }

    static postRegister(req, res) {
        let newAccount = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newAccount)
            .then(data => {
                req.session.userId = data.id
                res.render('new-profile', {user: data})
            })
    }

    static getNewProfile(req, res) {
        res.render('new-profile')
    }

    static postNewProfile(req, res) {
        let id = +req.params.id
        let newProfile = {
            bio: req.body.bio,
            profilePicture: req.body.profilePicture,
            UserId: id
        }

        Profile.create(newProfile)
            .then(() => {
                res.redirect(`/profile/${id}`)
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static profile(req, res) {
        let id = +req.params.id
        User.findByPk(id, {
            include: Profile
        })
            .then(data => {
                // console.log(data);
                res.render('profile', {data})
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static getEditProfile(req, res) {
        let id = +req.params.id
        Profile.findByPk(id)
            .then(data => {
                res.render('edit-profile', {profile: data})
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static postEditProfile(req, res) {
        let id = +req.params.id
        let editProfile = {
            bio: req.body.bio,
            profilePicture: req.body.profilePicture,
            UserId: id
        }

        Profile.update(editProfile, {
            where: {
                id: id
            }
        })
            .then(() => {
                res.redirect(`/profile/${id}`)
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static getLogOut(req, res) {
        req.session.destroy((err) => {
            if(err) log.error(err)
            else {
                res.redirect('/')
            }
        })
    }
}

module.exports = Controller;