import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import Features from './Features';
import asci1 from '../assets/ascilar/asci1.png';
import asci2 from '../assets/ascilar/asci2.png';
import asci3 from '../assets/ascilar/asci3.png';

function Home() {
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleStartClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
    } else {
      navigate('/ingredients');
    }
  };

  return (
    <div className="home-page">
      <div className="food-element"></div>
      <div className="food-element"></div>
      <div className="food-element"></div>
      
      <section id="hero" className="hero-section">
        <div className="hero-container">
          <h1 className="main-title">Yemek Tasarımı</h1>
          <p className="subtitle">Kendi yemeklerinizi oluşturun ve tadını çıkarın</p>
          <div className="button-container">
            <a href="#" onClick={handleStartClick} className="start-button">Hemen Başla</a>
            {showLoginMessage && (
              <div className="error-message">
                Öncelikle üye olmalısınız
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="ozellikler" className="section">
        <Features />
      </section>

      <section id="hizmetler" className="section">
        <div className="section-container">
          <h2 className="services-title">Hizmetlerimiz</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  <img src="/icons/meal-design.png" alt="Yemek Tasarımı" />
                </div>
                <div className="service-icon-glow"></div>
              </div>
              <h3>Yemek Tasarımı</h3>
              <p>Kendi damak zevkinize göre yemeklerinizi tasarlayın ve özelleştirin. Her detayı sizin kontrolünüzde.</p>
              <button className="service-button">
                Detaylı Bilgi
                <span className="button-glow"></span>
              </button>
            </div>

            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  <img src="/icons/recipe.png" alt="Kişisel Tarifler" />
                </div>
                <div className="service-icon-glow"></div>
              </div>
              <h3>Kişisel Tarifler</h3>
              <p>Size özel hazırlanmış tarifleri keşfedin. Tercihlerinize göre özelleştirilmiş benzersiz lezzetler.</p>
              <button className="service-button">
                Detaylı Bilgi
                <span className="button-glow"></span>
              </button>
            </div>

            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  <img src="/icons/order.png" alt="Anında Sipariş" />
                </div>
                <div className="service-icon-glow"></div>
              </div>
              <h3>Anında Sipariş</h3>
              <p>Tasarladığınız yemekleri hemen sipariş edin. Hızlı teslimat ile lezzetli yemekler kapınızda.</p>
              <button className="service-button">
                Detaylı Bilgi
                <span className="button-glow"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="hakkimizda" className="section">
        <div className="section-container">
          <h2>Hakkımızda</h2>
          <div className="about-layout">
            <div className="about-content">
              <div className="about-item">
                <div className="about-icon">🍽️</div>
                <h3>Misyonumuz</h3>
                <p>Misyonumuz, bireysel tercihlere ve diyet ihtiyaçlarına hitap eden özelleştirilebilir yemek seçenekleri sunmaktır.</p>
              </div>
              <div className="about-item">
                <div className="about-icon">🌍</div>
                <h3>Vizyonumuz</h3>
                <p>Herkesin kendine özgü zevklerine ve sağlık hedeflerine uygun yemeklerin tadını çıkarabileceği bir dünya hayal ediyoruz.</p>
              </div>
              <div className="about-item">
                <div className="about-icon">❤️</div>
                <h3>Değerlerimiz</h3>
                <ul className="values-list">
                  <li>Kaliteli Malzemeler</li>
                  <li>Müşteri Memnuniyeti</li>
                  <li>Yenilikçi Yaklaşımlar</li>
                </ul>
              </div>
            </div>
            <div className="about-image">
              <img src="/icons/restaurant.png" alt="Yemek İkonu" className="large-food-icon" />
            </div>
          </div>
        </div>
      </section>

      <section id="sss" className="section">
        <div className="section-container">
          <h2>Sıkça Sorulan Sorular</h2>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-icon">🛒</div>
              <div className="faq-content">
                <h3>Nasıl sipariş verebilirim?</h3>
                <p>Üye olduktan sonra menüden dilediğiniz yemeği seçip özelleştirebilir ve kolayca sipariş verebilirsiniz. Ödeme işlemini kredi kartı veya kapıda ödeme seçenekleriyle tamamlayabilirsiniz.</p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-icon">⏰</div>
              <div className="faq-content">
                <h3>Teslimat süresi ne kadar?</h3>
                <p>Siparişiniz ortalama 30-45 dakika içerisinde adresinize teslim edilir. Yoğunluk durumuna göre bu süre değişiklik gösterebilir. Sipariş takibini uygulamamız üzerinden anlık olarak yapabilirsiniz.</p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-icon">❤️</div>
              <div className="faq-content">
                <h3>Müşteri memnuniyeti garantisi nedir?</h3>
                <p>Siparişinizden memnun kalmamanız durumunda 30 dakika içinde bize bildirmeniz halinde ücret iadesi yapıyor veya yeni bir sipariş hazırlıyoruz. Müşteri memnuniyeti bizim için her şeyden önemli!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ekip" className="section">
        <div className="section-container">
          <h2>Ekibimiz</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src={asci1} alt="Baş Aşçı" />
              <h3>Tafyun Casniz</h3>
              <p>Baş Aşçı</p>
              <p className="team-description">10 yıllık deneyimiyle mutfağımızın lideri.</p>
            </div>
            <div className="team-member">
              <img src={asci2} alt="Mutfak Şefi" />
              <h3>Tahla Oskuz </h3>
              <p>Mutfak Şefi</p>
              <p className="team-description">Özel tariflerin ve lezzetlerin uzmanı.</p>
            </div>
            <div className="team-member">
              <img src={asci3} alt="Pastacı Şefi" />
              <h3>Orem Fakur Ravli</h3>
              <p>Pastacı Şefi</p>
              <p className="team-description">Tatlı ve pasta konusunda  gurme deneyimli şefimiz.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>İletişim</h3>
            <p>📞 +90 553 583 35 91</p>
            <p>📧 info@yemektasarim.com</p>
            <p>📍 Rize, Türkiye</p>
          </div>
          <div className="footer-section">
            <h3>Hızlı Linkler</h3>
            <ul>
              <li><a href="#hero">Ana Sayfa</a></li>
              <li><a href="#hizmetler">Hizmetlerimiz</a></li>
              <li><a href="#hakkimizda">Hakkımızda</a></li>
              <li><a href="#ekip">Ekibimiz</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Sosyal Medya</h3>
            <div className="social-links">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Yemek Tasarım. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;