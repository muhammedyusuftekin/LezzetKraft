import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './RecipeSuggestions.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PREDEFINED_RECIPES = [
  {
    id: 1,
    name: 'Tavuklu Pilav',
    description: 'Haşlanmış veya sote edilmiş tavuk göğsü ile tereyağlı beyaz pilav. Yanına biraz zeytinyağı ile tatlandırılmış salata eklenebilir.',
    requiredIngredients: ['Tavuk Göğsü', 'Pirinç'],
    imageUrl: '/images/recipes/tavuklu-pilav.jpg',
    prepTime: 15,
    cookTime: 30,
    nutrition: {
      calories: 450,
      protein: 35,
      carbs: 45,
      fat: 15
    }
  },
  {
    id: 2,
    name: 'Zeytinyağlı Brokoli Salatası',
    description: 'Hafif haşlanmış brokoli üzerine zeytinyağı, limon suyu ve sarımsaklı sos eklenerek hazırlanır. Sağlıklı bir başlangıç.',
    requiredIngredients: ['Brokoli', 'Zeytinyağı'],
    imageUrl: '/images/recipes/brokoli-salatasi.jpg',
    prepTime: 10,
    cookTime: 10,
    nutrition: {
      calories: 180,
      protein: 4,
      carbs: 12,
      fat: 14
    }
  },
  {
    id: 3,
    name: 'Kırmızı Mercimek Çorbası',
    description: 'Kırmızı mercimek, soğan, sarımsak ve havuç gibi sebzelerle birlikte haşlanır. Zeytinyağı ve baharatlarla tatlandırılır. Üzerine kruton eklenebilir.',
    requiredIngredients: ['Kırmızı Mercimek', 'Zeytinyağı'],
    imageUrl: '/images/recipes/mercimek-corbasi.jpg',
    prepTime: 10,
    cookTime: 30,
    nutrition: {
      calories: 220,
      protein: 12,
      carbs: 35,
      fat: 5
    }
  },
  {
    id: 4,
    name: 'Tavuklu Brokoli Sote',
    description: 'Tavuk göğsü parçaları ve brokoli zeytinyağında sotelenerek hafif baharatlarla lezzetlendirilir. Yanına kahverengi pirinç eklenebilir.',
    requiredIngredients: ['Tavuk Göğsü', 'Brokoli', 'Zeytinyağı'],
    imageUrl: '/images/recipes/tavuklu-brokoli.jpg',
    prepTime: 15,
    cookTime: 20,
    nutrition: {
      calories: 320,
      protein: 28,
      carbs: 15,
      fat: 18
    }
  },
  {
    id: 5,
    name: 'Mercimekli Pilav',
    description: 'Pirinç ve kırmızı mercimek birlikte pişirilir. Zeytinyağı ve kuru soğan ile tatlandırılır. Besleyici ve doyurucu bir yemek.',
    requiredIngredients: ['Pirinç', 'Kırmızı Mercimek'],
    imageUrl: '/images/recipes/mercimekli-pilav.jpg',
    prepTime: 10,
    cookTime: 25,
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 65,
      fat: 6
    }
  },
  {
    id: 6,
    name: 'Tavuklu Mercimek Pilavı',
    description: 'Tavuk parçaları, kırmızı mercimek ve pirinç aynı tencerede pişirilerek protein ve karbonhidrat dengesi sağlanır.',
    requiredIngredients: ['Tavuk Göğsü', 'Pirinç', 'Kırmızı Mercimek'],
    imageUrl: '/images/recipes/tavuklu-mercimek-pilav.jpg',
    prepTime: 15,
    cookTime: 35,
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 55,
      fat: 8
    }
  },
  {
    id: 7,
    name: 'Brokolili Sebzeli Pilav',
    description: 'Brokoli parçaları pilavın içinde pişirilir. Üzerine hafifçe zeytinyağı gezdirilir.',
    requiredIngredients: ['Brokoli', 'Zeytinyağı', 'Pirinç'],
    imageUrl: '/images/recipes/brokolili-pilav.jpg',
    prepTime: 10,
    cookTime: 25,
    nutrition: {
      calories: 340,
      protein: 8,
      carbs: 58,
      fat: 10
    }
  },
  {
    id: 8,
    name: 'Tavuklu Brokoli Pilavı',
    description: 'Tavuk göğsü ve brokoli ile birlikte aromatik baharatlarla pişirilen beyaz pilav.',
    requiredIngredients: ['Tavuk Göğsü', 'Brokoli', 'Pirinç'],
    imageUrl: '/images/recipes/tavuklu-brokolili-pilav.jpg',
    prepTime: 15,
    cookTime: 30,
    nutrition: {
      calories: 410,
      protein: 30,
      carbs: 48,
      fat: 12
    }
  }
];

const RecipeSuggestions = ({ selectedIngredients, nutritionSummary, onViewDetails }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [sortBy, setSortBy] = useState('calories');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [dietaryFilters, setDietaryFilters] = useState({
    vegan: false,
    glutenFree: false,
    lowCarb: false,
    vegetarian: false,
    dairyFree: false
  });
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      findMatchingRecipes();
    }
  }, [selectedIngredients, dietaryFilters]);

  const findMatchingRecipes = () => {
    setIsLoading(true);
    try {
      // Seçilen malzemelerin isimlerini al
      const selectedIngredientNames = selectedIngredients.map(ing => ing.name);

      // Tarifleri filtrele
      const matchingRecipes = PREDEFINED_RECIPES.filter(recipe => {
        // Tarifteki gerekli malzemelerin hepsi seçili malzemeler arasında var mı kontrol et
        return recipe.requiredIngredients.every(requiredIng => 
          selectedIngredientNames.includes(requiredIng)
        );
      });

      setRecipes(matchingRecipes);
      setError('');
    } catch (err) {
      setError(t('recipes.fetchError'));
      console.error('Tarif yükleme hatası:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (recipeId) => {
    try {
      const method = favorites.includes(recipeId) ? 'DELETE' : 'POST';
      const response = await fetch(`http://localhost:5001/api/recipes/favorites/${recipeId}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Favori işlemi başarısız oldu');
      }

      setFavorites(prev => {
        if (prev.includes(recipeId)) {
          return prev.filter(id => id !== recipeId);
        }
        return [...prev, recipeId];
      });
    } catch (err) {
      console.error('Favori işlemi hatası:', err);
    }
  };

  const sortRecipes = (recipes) => {
    return [...recipes].sort((a, b) => {
      switch (sortBy) {
        case 'calories':
          return a.nutrition.calories - b.nutrition.calories;
        case 'protein':
          return b.nutrition.protein - a.nutrition.protein;
        case 'carbs':
          return a.nutrition.carbs - b.nutrition.carbs;
        default:
          return 0;
      }
    });
  };

  const toggleDietaryFilter = (filter) => {
    setDietaryFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const toggleRecipeSelection = (recipe) => {
    setSelectedRecipes(prev => {
      const isSelected = prev.find(r => r.id === recipe.id);
      if (isSelected) {
        return prev.filter(r => r.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  };

  const generateShoppingList = () => {
    const ingredients = {};
    selectedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        const key = ing.ingredient.name;
        if (ingredients[key]) {
          ingredients[key].amount += ing.amount;
        } else {
          ingredients[key] = {
            amount: ing.amount,
            unit: ing.unit
          };
        }
      });
    });
    return ingredients;
  };

  const renderNutritionChart = () => {
    if (selectedRecipes.length === 0) return null;

    const dailyTotals = selectedRecipes.reduce((acc, recipe) => ({
      calories: acc.calories + recipe.nutrition.calories,
      protein: acc.protein + recipe.nutrition.protein,
      carbs: acc.carbs + recipe.nutrition.carbs,
      fat: acc.fat + recipe.nutrition.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    const data = {
      labels: [t('nutrition.calories'), t('nutrition.protein'), t('nutrition.carbs'), t('nutrition.fat')],
      datasets: [{
        label: t('nutrition.daily'),
        data: [dailyTotals.calories, dailyTotals.protein, dailyTotals.carbs, dailyTotals.fat],
        backgroundColor: ['#6c5ce7', '#a166ab', '#00b894', '#fdcb6e']
      }]
    };

    return (
      <div className="nutrition-chart">
        <h3>{t('nutrition.dailyTotal')}</h3>
        <Bar data={data} options={{ responsive: true }} />
      </div>
    );
  };

  const renderSkeletonLoader = () => (
    <div className="recipes-grid">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="recipe-card skeleton">
          <div className="recipe-image skeleton-image" />
          <div className="recipe-content">
            <div className="skeleton-text" />
            <div className="skeleton-text" />
            <div className="skeleton-text" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderRecipeDetails = (recipe) => {
    if (!recipe) return null;
    
    return (
      <div className="recipe-details">
        <div className="recipe-details-header">
          <h3>{recipe.name}</h3>
          <button className="close-details" onClick={() => setSelectedRecipeId(null)}>×</button>
        </div>
        <div className="recipe-details-content">
          <div className="recipe-details-image">
            <img src={recipe.imageUrl} alt={recipe.name} />
          </div>
          <div className="recipe-info">
            <div className="recipe-stats">
              <div className="stat">
                <span className="label">Kalori:</span>
                <span className="value">{recipe.nutrition.calories} kcal</span>
              </div>
              <div className="stat">
                <span className="label">Protein:</span>
                <span className="value">{recipe.nutrition.protein}g</span>
              </div>
              <div className="stat">
                <span className="label">Karbonhidrat:</span>
                <span className="value">{recipe.nutrition.carbs}g</span>
              </div>
              <div className="stat">
                <span className="label">Yağ:</span>
                <span className="value">{recipe.nutrition.fat}g</span>
              </div>
            </div>
            <div className="recipe-times">
              <div className="time">
                <span className="label">Hazırlık:</span>
                <span className="value">{recipe.prepTime} dk</span>
              </div>
              <div className="time">
                <span className="label">Pişirme:</span>
                <span className="value">{recipe.cookTime} dk</span>
              </div>
            </div>
            <div className="recipe-description">
              <h4>Tarif Açıklaması</h4>
              <p>{recipe.description}</p>
            </div>
            <div className="recipe-ingredients">
              <h4>Malzemeler</h4>
              <ul>
                {recipe.requiredIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleOrder = (recipeId) => {
    navigate('/orders', { state: { orderedRecipe: recipeId } });
  };

  if (selectedIngredients.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="recipes-container">
        <div className="recipes-header">
          <h3>{t('recipes.loading')}</h3>
        </div>
        {renderSkeletonLoader()}
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipes-container">
        <div className="recipes-error">
          <p>{error}</p>
          <button className="retry-button" onClick={findMatchingRecipes}>
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  const sortedRecipes = sortRecipes(recipes);

  return (
    <div className="recipes-container">
      <div className="recipes-header">
        <h3>{t('recipes.suggestions')}</h3>
        <div className="recipes-filters">
          <div className="dietary-filters">
            {Object.keys(dietaryFilters).map(filter => (
              <button
                key={filter}
                className={`filter-button ${dietaryFilters[filter] ? 'active' : ''}`}
                onClick={() => toggleDietaryFilter(filter)}
              >
                {t(`dietary.${filter}`)}
              </button>
            ))}
          </div>
          <div className="recipes-sort">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="calories">{t('sort.calories')}</option>
              <option value="protein">{t('sort.protein')}</option>
              <option value="carbs">{t('sort.carbs')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="recipes-grid">
        {sortedRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-image">
              <img src={recipe.imageUrl} alt={recipe.name} />
              <div className="recipe-actions">
                <button 
                  className={`favorite-button ${favorites.includes(recipe.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe.id);
                  }}
                >
                  ♥
                </button>
              </div>
            </div>
            <div className="recipe-content">
              <h4>{recipe.name}</h4>
              <div className="recipe-metrics">
                <span>{recipe.triedCount} {t('recipes.tried')}</span>
                <span>{recipe.favoriteCount} {t('recipes.favorites')}</span>
              </div>
              <div className="recipe-nutrition">
                <span>{recipe.nutrition.calories} kcal</span>
                <span>{recipe.nutrition.protein}g {t('nutrition.protein')}</span>
                <span>{recipe.nutrition.carbs}g {t('nutrition.carbs')}</span>
              </div>
              <div className="recipe-meta">
                <span>{t('recipes.prep')}: {recipe.prepTime} {t('time.min')}</span>
                <span>{t('recipes.cook')}: {recipe.cookTime} {t('time.min')}</span>
              </div>
              <div className="recipe-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <span 
                    key={star} 
                    className={`star ${star <= recipe.rating ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
                <span className="rating-count">({recipe.ratingCount})</span>
              </div>
              <div className="recipe-buttons">
                <button 
                  className="view-details-button"
                  onClick={() => setSelectedRecipeId(recipe.id)}
                >
                  Tarifi Görüntüle
                </button>
                <button 
                  className="order-button disabled"
                  disabled
                >
                  Sipariş Ver
                </button>
              </div>
              {selectedRecipeId === recipe.id && renderRecipeDetails(recipe)}
            </div>
          </div>
        ))}
      </div>

      {selectedRecipes.length > 0 && (
        <div className="meal-plan-section">
          <h3>{t('mealPlan.title')} ({selectedRecipes.length})</h3>
          <button 
            className="toggle-meal-plan-button"
            onClick={() => setShowMealPlan(!showMealPlan)}
          >
            {showMealPlan ? t('mealPlan.hide') : t('mealPlan.show')}
          </button>
          
          {showMealPlan && (
            <>
              {renderNutritionChart()}
              
              <div className="shopping-list">
                <h4>{t('mealPlan.shoppingList')}</h4>
                <ul>
                  {Object.entries(generateShoppingList()).map(([ingredient, details]) => (
                    <li key={ingredient}>
                      {details.amount} {details.unit} {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeSuggestions; 