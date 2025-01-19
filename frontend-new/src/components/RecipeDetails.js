import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`https://lezzetkraftapp-b9hnafgkebhhg7az.francecentral-01.azurewebsites.net/api/recipes/${id}`);
      if (!response.ok) {
        throw new Error('Tarif detayları yüklenemedi');
      }
      const data = await response.json();
      setRecipe(data.recipe);
    } catch (err) {
      setError('Tarif detayları alınamadı. Lütfen daha sonra tekrar deneyin.');
      console.error('Tarif detay hatası:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="recipe-details-loading">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="recipe-details-error">{error}</div>;
  }

  if (!recipe) {
    return <div className="recipe-details-error">Tarif bulunamadı</div>;
  }

  return (
    <div className="recipe-details-container">
      <div className="recipe-details-content">
        <div className="recipe-header">
          <h1>{recipe.name}</h1>
          <div className="recipe-meta-info">
            <span>Zorluk: {recipe.difficulty}</span>
            <span>Hazırlık: {recipe.prepTime} dk</span>
            <span>Pişirme: {recipe.cookTime} dk</span>
          </div>
        </div>

        <div className="recipe-image-container">
          <img src={recipe.imageUrl} alt={recipe.name} />
        </div>

        <div className="recipe-description">
          <p>{recipe.description}</p>
        </div>

        <div className="recipe-nutrition">
          <h2>Besin Değerleri</h2>
          <div className="nutrition-grid">
            <div className="nutrition-item">
              <span className="value">{recipe.nutrition.calories}</span>
              <span className="label">kalori</span>
            </div>
            <div className="nutrition-item">
              <span className="value">{recipe.nutrition.protein}g</span>
              <span className="label">protein</span>
            </div>
            <div className="nutrition-item">
              <span className="value">{recipe.nutrition.fat}g</span>
              <span className="label">yağ</span>
            </div>
            <div className="nutrition-item">
              <span className="value">{recipe.nutrition.carbs}g</span>
              <span className="label">karbonhidrat</span>
            </div>
          </div>
        </div>

        <div className="recipe-ingredients">
          <h2>Malzemeler</h2>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>
                {item.amount} {item.unit} {item.ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-instructions">
          <h2>Hazırlanışı</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>
                <span className="step-number">{instruction.step}</span>
                <p>{instruction.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="recipe-reviews">
          <h2>Değerlendirmeler</h2>
          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-value">{recipe.averageRating.toFixed(1)}</span>
              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span 
                    key={star} 
                    className={`star ${star <= recipe.averageRating ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-count">({recipe.ratingCount} değerlendirme)</span>
            </div>
          </div>
          
          <div className="reviews-list">
            {recipe.ratings.map((rating, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <span className="reviewer">{rating.user.username}</span>
                  <div className="review-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span 
                        key={star} 
                        className={`star ${star <= rating.rating ? 'filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="review-date">
                    {new Date(rating.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <p className="review-comment">{rating.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails; 