import React from 'react';
import { useState } from 'react';
import {BrowserRouter as Router, 
        Route, 
        Routes} from 'react-router-dom';
import MapPage from './MapPage/MapPage';
import LoginPage from './LoginPage/LoginPage';

const App = () => {
  const [count, setCount] = useState(0)
  return (
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/map' element={<MapPage />} />
        </Routes>
      </Router>
  );
}

export default App;
