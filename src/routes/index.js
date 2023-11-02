const authRouter = require('./auth')
const caffeRouter = require('./caffe')
const commentRouter = require('./comment')
const cartRouter = require('./cart')

const route = (app) => {
    app.use('/auth', authRouter)
    app.use('/coffe', caffeRouter)
    app.use('/comment', commentRouter)
    app.use('/cart', cartRouter)
}

module.exports = route
