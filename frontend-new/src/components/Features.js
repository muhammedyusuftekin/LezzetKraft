import React from 'react';
import { FaUtensils, FaChartBar, FaLeaf } from 'react-icons/fa';
import './Features.css';

function Features() {
  return (
    <div className="features-section">
      <h2>Özellikler</h2>
      <div className="features-container">
        <div className="feature-card meal-design">
          <div className="icon-container">
            <FaUtensils className="feature-icon" />
            <div className="plate-animation">
              <span className="ingredient ingredient-1"></span>
              <span className="ingredient ingredient-2"></span>
              <span className="ingredient ingredient-3"></span>
            </div>
          </div>
          <h3>Yemek Tasarımı</h3>
          <p>Kendi damak zevkinize göre yemeklerinizi tasarlayın ve özelleştirin.</p>
          <div className="feature-details">
            <span>Malzeme Seçimi</span>
            <span>Porsiyon Kontrolü</span>
            <span>Özel Tarifler</span>
          </div>
        </div>

        <div className="feature-card real-time">
          <div className="icon-container">
            <FaChartBar className="feature-icon" />
            <div className="nutrition-values">
              <span className="value calories">Kalori</span>
              <span className="value protein">Protein</span>
              <span className="value carbs">Karb</span>
            </div>
          </div>
          <h3>Gerçek Zamanlı Hesaplama</h3>
          <p>Besin değerlerini anlık olarak takip edin ve kontrol altında tutun.</p>
          <div className="feature-details">
            <span>Kalori Takibi</span>
            <span>Besin Analizi</span>
            <span>Günlük Hedefler</span>
          </div>
        </div>

        <div className="feature-card diet-pref">
          <div className="icon-container">
            <FaLeaf className="feature-icon" />
            <div className="diet-types">
              <span className="diet vegan">Vegan</span>
              <span className="diet gluten">Glutensiz</span>
              <span className="diet keto">Keto</span>
            </div>
          </div>
          <h3>Diyet Tercihleri</h3>
          <p>Size özel diyet tercihlerinize uygun yemek seçenekleri sunuyoruz.</p>
          <div className="feature-details">
            <span>Özel Diyet</span>
            <span>Alerjen Kontrolü</span>
            <span>Beslenme Planı</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features; 