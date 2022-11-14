const router = require("express").Router();

// import the functionality from comments-controller
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comments-controller");

// const { remove } = require('../../models/Comment');

// Set up /api/comments/:pizzaId
router.route("/:pizzaId").post(addComment);

// Set up /api/comments/:pizzaId/:commentId
router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment);

// deleting a reply from a comment will require a new, separate route
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);


module.exports = router;
