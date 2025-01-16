const express = require('express');
const router = express.Router();
const {
  getAllIngredients,
  getIngredientsByCategory,
  addIngredient,
  updateIngredient,
  deleteIngredient,
  calculateNutrition
} = require('../controllers/ingredientController');

// Public routes
router.get('/', getAllIngredients);
router.get('/category/:category', getIngredientsByCategory);
router.post('/calculate-nutrition', calculateNutrition);

module.exports = router; 