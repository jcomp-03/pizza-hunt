const router = require('express').Router();

// import the functionality from comments-controller
const { 
    addComment, 
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comments-controller');

// Set up /api/comments/:pizzaId    
router.route('/:pizzaId').post(addComment);

// Set up /api/comments/:pizzaId/:commentId
router.route('/:pizzaId/:commentId')
.put(addReply)
.delete(removeComment);

// Set up /api/comments/:pizzaId/:commentId/:replyId
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);


module.exports = router;