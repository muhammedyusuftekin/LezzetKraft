const Ingredient = require('../models/Ingredient');

// İngilizce-Türkçe malzeme çevirileri
const translations = {
  'chicken breast': 'Tavuk Göğsü',
  'rice': 'Pirinç',
  'broccoli': 'Brokoli',
  'olive oil': 'Zeytinyağı',
  'tomato': 'Domates',
  'onion': 'Soğan',
  'garlic': 'Sarımsak',
  'carrot': 'Havuç',
  'potato': 'Patates',
  'beef': 'Dana Eti',
  'salmon': 'Somon',
  'egg': 'Yumurta',
  'milk': 'Süt',
  'cheese': 'Peynir',
  'butter': 'Tereyağı',
  'pasta': 'Makarna',
  'bread': 'Ekmek',
  'apple': 'Elma',
  'banana': 'Muz',
  'spinach': 'Ispanak'
};

// Malzeme kategorileri
const categories = {
  'meat': 'Et',
  'vegetable': 'Sebze',
  'fruit': 'Meyve',
  'grain': 'Tahıl',
  'dairy': 'Süt Ürünü',
  'oil': 'Yağ',
  'spice': 'Baharat'
};

// Tüm malzemeleri getir
const getAllIngredients = async (req, res) => {
  try {
    // Örnek malzemeler
    const sampleIngredients = [
      {
        id: '1',
        name: 'Tavuk Göğsü',
        category: 'Protein',
        nutrition: {
          calories: 165,
          protein: 31,
          carbs: 0,
          fat: 3.6
        },
        imageUrl: '/images/ingredients/chicken-breast.jpg',
        description: 'Yağsız tavuk göğsü'
      },
      {
        id: '2',
        name: 'Pirinç',
        category: 'Tahıl',
        nutrition: {
          calories: 130,
          protein: 2.7,
          carbs: 28,
          fat: 0.3
        },
        imageUrl: '/images/ingredients/rice.jpg',
        description: 'Beyaz pirinç'
      },
      {
        id: '3',
        name: 'Brokoli',
        category: 'Sebze',
        nutrition: {
          calories: 55,
          protein: 3.7,
          carbs: 11.2,
          fat: 0.6
        },
        imageUrl: '/images/ingredients/broccoli.jpg',
        description: 'Taze brokoli'
      },
      {
        id: '4',
        name: 'Kırmızı Mercimek',
        category: 'Bakliyat',
        nutrition: {
          calories: 230,
          protein: 18,
          carbs: 40,
          fat: 0.8
        },
        imageUrl: '/images/ingredients/red-lentils.jpg',
        description: 'Kırmızı mercimek'
      },
      {
        id: '5',
        name: 'Zeytinyağı',
        category: 'Sos',
        nutrition: {
          calories: 120,
          protein: 0,
          carbs: 0,
          fat: 14
        },
        imageUrl: '/images/ingredients/olive-oil.jpg',
        description: 'Sızma zeytinyağı'
      }
    ];

    res.status(200).json({
      success: true,
      count: sampleIngredients.length,
      data: sampleIngredients
    });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({
      success: false,
      error: 'Malzemeler getirilirken bir hata oluştu'
    });
  }
};

// Kategori bazlı malzemeleri getir
const getIngredientsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const ingredients = await Ingredient.find({ 
      category, 
      isActive: true 
    }).sort('name');
    
    res.status(200).json({
      success: true,
      count: ingredients.length,
      data: ingredients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Kategori bazlı malzemeler getirilirken bir hata oluştu'
    });
  }
};

// Besin değeri hesaplama
const calculateNutrition = async (req, res) => {
  try {
    const { ingredients } = req.body;
    
    const totalNutrition = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
    
    ingredients.forEach(ingredient => {
      totalNutrition.calories += ingredient.nutrition.calories;
      totalNutrition.protein += ingredient.nutrition.protein;
      totalNutrition.carbs += ingredient.nutrition.carbs;
      totalNutrition.fat += ingredient.nutrition.fat;
    });
    
    res.status(200).json({
      success: true,
      data: totalNutrition
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Besin değerleri hesaplanırken bir hata oluştu'
    });
  }
};

module.exports = {
  getAllIngredients,
  getIngredientsByCategory,
  calculateNutrition
}; 