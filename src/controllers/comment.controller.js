let _commentService = null;
class CommentController{
    constructor({ CommentService }){
        _commentService = CommentService;
    }

    async get(req, res){
        const { commentId } = req.params;
        const comment = await _commentService.get(commentId);
        return res.send(comment);
    }


    async update(req, res){
        const { body } = req;
        const { commentId } = req.params;
        const updateComment  = await _commentService.update(commentId, body);
        return res.send(updateComment);
    }

    async delete( req, res ){
        const {commentId} = req.params;
        const deleteCommment = await _commentService.delete(commentId);
        return res.send(deleteCommment);
    }


    async getIdeasComments(req, res){
        const { ideasId } = req.params;
        const comments = await _commentService.getIdeasComments(ideaId);
        return res.send(comments);
    }

    async createComment(req, res){
        const {body} = req;
        const {ideaId} = req.params;
        const createdComment = await _commentService.createdComment(body, ideaId);
        return res.status(201).send(createdComment);
    }
}

module.exports = CommentController;