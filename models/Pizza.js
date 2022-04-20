// import required dependencies Schema constructor and model function
const { Schema, model } = require('mongoose');
// import function for adjusting createdAt value
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
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
  return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;