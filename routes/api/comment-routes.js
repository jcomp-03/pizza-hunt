const router = require('express').Router();

// import the functionality from comments-controller
const { 
    addComment, 
    removeComment 
} = require('../../controllers/comments-controller');

// const { remove } = require('../../models/Comment');

// Set up /api/comments/:pizzaId
router.route('/:pizzaId').post(addComment);

// Set up /api/comments/:pizzaId/:commentId
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;