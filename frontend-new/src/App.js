import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import IngredientSelection from './components/IngredientSelection';
import Orders from './components/Orders';
import RecipeDetails from './components/RecipeDetails';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ingredients" element={<IngredientSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/siparislerim" element={<Orders />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
