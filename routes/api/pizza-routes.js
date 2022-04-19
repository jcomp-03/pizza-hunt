const router = require('express').Router();

// import the functionality we developed in controllers/pizza-controller and hook it up with the routes in the lines below
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
  } = require('../../controllers/pizza-controller');

// Set up GET all and POST at /api/pizzas
router
  .route('/')
  .get(getAllPizza) // See how we simply provide the name of the controller method as the callback? That's why we set up those methods to accept req and res as parameters!
  .post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;