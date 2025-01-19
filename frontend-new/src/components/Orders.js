import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Lütfen giriş yapın');
        setIsLoading(false);
        return;
      }

      const response = await fetch('https://lezzetkraftapp-b9hnafgkebhhg7az.francecentral-01.azurewebsites.net/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Siparişler alınamadı');
      }

      const data = await response.json();
      setOrders(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="orders-container">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="orders-container">Hata: {error}</div>;
  }

  return (
    <div className="orders-container">
      <div className="orders-card">
        <h2>Siparişlerim</h2>
        {orders.length === 0 ? (
          <div className="no-orders-message">
            <i className="no-orders-icon">📦</i>
            <p>Henüz hiç sipariş vermediniz.</p>
            <p className="no-orders-sub">Sipariş vermek için menümüze göz atabilirsiniz.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-item">
                {/* Sipariş detayları burada gösterilecek */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 