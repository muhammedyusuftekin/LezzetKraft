import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Giriş denemesi:', formData);
      
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Sunucu yanıtı:', data);

      if (response.ok) {
        console.log('Giriş başarılı, token:', data.token);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        console.log('Giriş başarısız:', data.message);
        setError(data.message || 'Kullanıcı adı veya şifre hatalı');
      }
    } catch (error) {
      console.error('Sunucu hatası:', error);
      setError('Sunucuya bağlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <h2>Giriş Yap</h2>
          <p className="welcome-text">Yemek Tasarım dünyasına hoş geldiniz!</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Şifreniz"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="login-button2"
              disabled={isLoading}
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              <div className="button-glow"></div>
            </button>
          </form>

          <div className="login-footer">
            <p>Hesabınız yok mu? <Link to="/register">Üye Ol</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 