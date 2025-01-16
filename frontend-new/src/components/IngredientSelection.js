import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './IngredientSelection.css';
import RecipeSuggestions from './RecipeSuggestions';

ChartJS.register(ArcElement, Tooltip, Legend);

const MAX_INGREDIENTS = 10;
const RECOMMENDED_CALORIES = 800;

const IngredientSelection = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [nutritionSummary, setNutritionSummary] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0
  });
  const [showRecipes, setShowRecipes] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [ingredientToRemove, setIngredientToRemove] = useState(null);
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [hoveredIngredient, setHoveredIngredient] = useState(null);

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    calculateNutritionSummary();
  }, [selectedIngredients]);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/ingredients');
      if (!response.ok) {
        throw new Error('Malzemeler yüklenemedi');
      }
      const data = await response.json();
      console.log('Gelen malzemeler:', data);
      setIngredients(data.data || []);
    } catch (err) {
      console.error('Malzeme yükleme hatası:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateNutritionSummary = () => {
    const summary = selectedIngredients.reduce((acc, ingredient) => ({
      calories: acc.calories + (ingredient.nutrition?.calories || 0),
      protein: acc.protein + (ingredient.nutrition?.protein || 0),
      fat: acc.fat + (ingredient.nutrition?.fat || 0),
      carbohydrates: acc.carbohydrates + (ingredient.nutrition?.carbs || 0)
    }), { calories: 0, protein: 0, fat: 0, carbohydrates: 0 });

    setNutritionSummary(summary);
  };

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.length >= MAX_INGREDIENTS && !selectedIngredients.find(item => item.id === ingredient.id)) {
      alert(`En fazla ${MAX_INGREDIENTS} malzeme seçebilirsiniz.`);
      return;
    }

    setSelectedIngredients(prev => {
      const isSelected = prev.find(item => item.id === ingredient.id);
      if (isSelected) {
        return prev.filter(item => item.id !== ingredient.id);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!categoryFilter || ingredient.category === categoryFilter)
  );

  const getProgressPercentage = () => {
    return Math.min((nutritionSummary.calories / RECOMMENDED_CALORIES) * 100, 100);
  };

  const handleShowRecipes = () => {
    setShowRecipes(true);
  };

  const handleViewRecipeDetails = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleRemoveIngredient = (ingredient, e) => {
    e.stopPropagation();
    setIngredientToRemove(ingredient);
    setShowConfirmDialog(true);
  };

  const confirmRemoveIngredient = () => {
    if (ingredientToRemove) {
      setSelectedIngredients(prev => 
        prev.filter(item => item.id !== ingredientToRemove.id)
      );
    }
    setShowConfirmDialog(false);
    setIngredientToRemove(null);
  };

  const renderNutritionPieChart = () => {
    if (nutritionSummary.calories === 0) return null;

    const data = {
      labels: ['Protein', 'Yağ', 'Karbonhidrat'],
      datasets: [{
        data: [
          nutritionSummary.protein * 4, // protein calories
          nutritionSummary.fat * 9,     // fat calories
          nutritionSummary.carbohydrates * 4  // carb calories
        ],
        backgroundColor: [
          '#6c5ce7',
          '#a166ab',
          '#00b894'
        ],
        borderWidth: 0
      }]
    };

    const options = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'white',
            font: {
              size: 12
            }
          }
        }
      }
    };

    return (
      <div className="nutrition-pie-chart">
        <h3>Kalori Dağılımı</h3>
        <Pie data={data} options={options} />
      </div>
    );
  };

  if (isLoading) {
    return <div className="ingredients-container">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="ingredients-container">Hata: {error}</div>;
  }

  return (
    <div className="ingredients-container">
      <div className="ingredients-content">
        <h2>Malzeme Seçimi</h2>
        
        <div className="filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Malzeme ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-filter">
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Tüm Kategoriler</option>
              <option value="Protein">Protein</option>
              <option value="Sebze">Sebze</option>
              <option value="Tahıl">Tahıl</option>
              <option value="Bakliyat">Bakliyat</option>
              <option value="Baharat">Baharat</option>
              <option value="Sos">Sos</option>
            </select>
          </div>
        </div>

        <div className="progress-container">
          <h3>Öğün Durumu</h3>
          <div className="progress-label">
            <span>Kalori Hedefi</span>
            <span>{nutritionSummary.calories.toFixed(0)} / {RECOMMENDED_CALORIES} kcal</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${getProgressPercentage()}%`,
                background: `linear-gradient(90deg, 
                  ${nutritionSummary.calories > RECOMMENDED_CALORIES ? '#ff4757' : '#6c5ce7'}, 
                  ${nutritionSummary.calories > RECOMMENDED_CALORIES ? '#ff6b81' : '#a166ab'})`
              }}
            ></div>
          </div>
          <div className="progress-label" style={{ marginTop: '1rem' }}>
            <span>Seçilen Malzemeler</span>
            <span>{selectedIngredients.length} / {MAX_INGREDIENTS}</span>
          </div>
        </div>

        <div className="ingredients-grid">
          {filteredIngredients.map(ingredient => (
            <div
              key={ingredient.id}
              className={`ingredient-card ${selectedIngredients.find(item => item.id === ingredient.id) ? 'selected' : ''}`}
              onClick={() => toggleIngredient(ingredient)}
              onMouseEnter={() => setHoveredIngredient(ingredient)}
              onMouseLeave={() => setHoveredIngredient(null)}
            >
              <img 
                src={ingredient.imageUrl} 
                alt={ingredient.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/icons/default-ingredient.png';
                }}
              />
              <h3>{ingredient.name}</h3>
              <div className="nutrition-info">
                <span>{ingredient.nutrition?.calories || 0} kcal</span>
              </div>
              <div className="nutrition-details">
                <ul>
                  <li>
                    <span>Kalori</span>
                    <span>{ingredient.nutrition?.calories || 0} kcal</span>
                  </li>
                  <li>
                    <span>Protein</span>
                    <span>{ingredient.nutrition?.protein || 0}g</span>
                  </li>
                  <li>
                    <span>Yağ</span>
                    <span>{ingredient.nutrition?.fat || 0}g</span>
                  </li>
                  <li>
                    <span>Karbonhidrat</span>
                    <span>{ingredient.nutrition?.carbs || 0}g</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {selectedIngredients.length > 0 && (
          <>
            <div className="nutrition-summary">
              <h3>Besin Değerleri Özeti</h3>
              <div className="nutrition-summary-content">
                <table>
                  <thead>
                    <tr>
                      <th>Kalori</th>
                      <th>Protein</th>
                      <th>Yağ</th>
                      <th>Karbonhidrat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{nutritionSummary.calories.toFixed(1)} kcal</td>
                      <td>{nutritionSummary.protein.toFixed(1)}g</td>
                      <td>{nutritionSummary.fat.toFixed(1)}g</td>
                      <td>{nutritionSummary.carbohydrates.toFixed(1)}g</td>
                    </tr>
                  </tbody>
                </table>
                {renderNutritionPieChart()}
              </div>
            </div>

            <div className="selected-ingredients">
              <h3>Seçilen Malzemeler</h3>
              <div className="selected-items">
                {selectedIngredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="selected-item">
                    <span>{ingredient.name}</span>
                    <button onClick={(e) => handleRemoveIngredient(ingredient, e)}>×</button>
                  </div>
                ))}
              </div>
            </div>

            {!showRecipes ? (
              <button 
                className="get-recipes-button"
                onClick={handleShowRecipes}
              >
                Tarifleri Göster
              </button>
            ) : (
              <RecipeSuggestions 
                selectedIngredients={selectedIngredients}
                nutritionSummary={nutritionSummary}
                onViewDetails={handleViewRecipeDetails}
              />
            )}
          </>
        )}
      </div>

      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Malzemeyi Kaldır</h3>
            <p>{ingredientToRemove?.name} malzemesini kaldırmak istediğinizden emin misiniz?</p>
            <div className="modal-actions">
              <button onClick={() => setShowConfirmDialog(false)}>İptal</button>
              <button onClick={confirmRemoveIngredient} className="confirm-button">
                Kaldır
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSelection; 