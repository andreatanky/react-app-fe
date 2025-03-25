import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import NavBar from './components/Navbar';
import Home from './pages/Home'
import PastProducts from './pages/PastProducts'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/past-products" element={<PastProducts />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
