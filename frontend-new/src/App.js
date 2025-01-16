import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import IngredientSelection from './components/IngredientSelection';
import RecipeSuggestions from './components/RecipeSuggestions';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ingredients" element={<IngredientSelection />} />
          <Route path="/recipes" element={<RecipeSuggestions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
