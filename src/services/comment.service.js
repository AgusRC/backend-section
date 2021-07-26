const BaseService = require("./base.service");
let _commentRepository = null,
_ideaRepository = null;

class CommentService extends BaseService{
    constructor({ CommentRepository, IdeaRepository }){
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }

    async getIdeaComments(IdeaId){
        if(!IdeaId){
            const error = new Error();
            error.status = 400;
            error.message = "IdeaId must be sent";
            throw error;
        }

        const idea = await _ideaRepository.get(IdeaId);
        if(!idea){
            const error = new Error();
            error.status = 400;
            error.message = "Idea dont exist";
            throw error;
        }

        const { comments } = idea;
        return comments;
    }

    async createComment(comment, ideaId){
        if(!IdeaId){
            const error = new Error();
            error.status = 400;
            error.message = "IdeaId must be sent";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);

        if(!idea){
            const error = new Error();
            error.status = 400;
            error.message = "Idea dont exist";
            throw error;
        }

        const createdComment = await _commentRepository.create(comment);
        idea.comments.push(createdComment);

        return await _ideaRepository.update(ideaId, {comments: idea.comments})
    }

}

module.exports = CommentService;