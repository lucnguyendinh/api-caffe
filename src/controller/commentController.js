const { Comment } = require('../models')

const commentController = {
    comment: async (req, res) => {
        try {
            const newComment = new Comment({
                idCoffe: req.body.idCoffe,
                sender: req.body.sender,
                text: req.body.text,
            })
            const comment = await (await newComment.save()).populate('sender')
            res.status(200).json(comment)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getComment: async (req, res) => {
        try {
            const comments = await Comment.find({ idCoffe: req.params.idCoffe }).populate('sender')
            return res.status(200).json(comments)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = commentController
