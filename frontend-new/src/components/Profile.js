import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [userInfo] = useState({
    email: 'kullanici@example.com',
    registerDate: '15 Ocak 2024',
    lastLogin: '23 Ocak 2024',
    savedRecipes: 5
  });

  const [preferences, setPreferences] = useState({
    notifications: false,
    emailNotifications: false
  });

  const handlePreferenceChange = (preference) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profil Bilgileri</h2>
      </div>
      
      <div className="profile-section">
        <h3>Hesap Bilgileri</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>E-posta</label>
            <span>{userInfo.email}</span>
          </div>
          <div className="info-item">
            <label>Kayıt Tarihi</label>
            <span>{userInfo.registerDate}</span>
          </div>
          <div className="info-item">
            <label>Son Giriş</label>
            <span>{userInfo.lastLogin}</span>
          </div>
          <div className="info-item">
            <label>Kaydedilen Tarifler</label>
            <span>{userInfo.savedRecipes}</span>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3>Güvenlik</h3>
        <div className="security-buttons">
          <button className="profile-button">Şifre Değiştir</button>
          <button className="profile-button">E-posta Değiştir</button>
        </div>
      </div>

      <div className="profile-section">
        <h3>Tercihler</h3>
        <div className="preferences">
          <div className="preference-item">
            <span>Bildirimler</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={preferences.notifications}
                onChange={() => handlePreferenceChange('notifications')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="preference-item">
            <span>E-posta Bildirimleri</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={preferences.emailNotifications}
                onChange={() => handlePreferenceChange('emailNotifications')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3>Hesap Yönetimi</h3>
        <div className="account-management">
          <button className="delete-button">Hesabı Sil</button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 