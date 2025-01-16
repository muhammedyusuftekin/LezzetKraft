import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, [location]);

  const checkLoginStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      try {
        const response = await fetch('http://localhost:5001/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Profil bilgileri alınamadı:', error);
        handleLogout();
      }
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}>LezzetKraft</a>
        </div>
        <div className="nav-menu">
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}>Ana Sayfa</a></li>
            <li><a href="#ozellikler" onClick={(e) => {
              e.preventDefault();
              scrollToSection('ozellikler');
            }}>Özellikler</a></li>
            <li><a href="#hizmetler" onClick={(e) => {
              e.preventDefault();
              scrollToSection('hizmetler');
            }}>Hizmetler</a></li>
            <li><a href="#hakkimizda" onClick={(e) => {
              e.preventDefault();
              scrollToSection('hakkimizda');
            }}>Hakkımızda</a></li>
            <li><a href="#sss" onClick={(e) => {
              e.preventDefault();
              scrollToSection('sss');
            }}>SSS</a></li>
            <li><a href="#ekip" onClick={(e) => {
              e.preventDefault();
              scrollToSection('ekip');
            }}>Ekip</a></li>
            {isLoggedIn && (
              <li><Link to="/siparislerim" className="disabled">Siparişlerim</Link></li>
            )}
          </ul>
        </div>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <div className="profile-menu-container">
              <button 
                className="profile-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {username}
              </button>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <Link to="/profile">Profil Bilgileri</Link>
                  <Link to="/siparislerim" className="disabled">Siparişlerim</Link>
                  <button onClick={handleLogout}>Çıkış Yap</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="login-button">Giriş Yap</Link>
              <Link to="/register" className="signup-button">Üye Ol</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header; 