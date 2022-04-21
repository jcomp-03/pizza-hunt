// import required dependencies Schema constructor and model function
const { Schema, model } = require('mongoose');
// import function for adjusting createdAt value
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: "You need to enter a name for your pizza. Please try again.",
      trim: true
    },
    createdBy: {
      type: String,
      required: "Please enter who is creating this work of art.",
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: "Please enter a size for your pizza.",
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: 'Large'
    },
    
    toppings: [],

    comments: [
      {
        // we need to tell Mongoose to expect an ObjectId
        // and to tell it that its data comes from the Comment model.
        type: Schema.Types.ObjectId,
        //The ref property is especially important because it tells the
        // Pizza model which documents to search to find the right comments.
        ref: 'Comment'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;