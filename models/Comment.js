// import required dependencies Schema constructor and model function
const { Schema, model, Types } = require("mongoose");
// import function for adjusting createdAt value
const dateFormat = require("../utils/dateFormat");

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
      required: 'You need to provide a reply body.',
      trim: true
    },
    writtenBy: {
      type: String,
      required: 'You need to provide a reply author.'

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    }
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: 'You need to provide a comment author.'

    },
    commentBody: {
      type: String,
      required: 'You need to provide a comment body.'

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // unlike our relationship between pizza
    // and comment data, replies will be nested
    // directly in a comment's document and not
    // referred to
    replies: [ReplySchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  }
);

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
})

// create the Comment model using the CommentSchema
const Comment = model("Comment", CommentSchema);

// export the Comment model
module.exports = Comment;
