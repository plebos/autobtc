import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AutoBTC from './components/AutoBTC';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<AutoBTC chatMode="normal" />} />
            <Route path="/faq" element={<AutoBTC chatMode="faq" />} />
            <Route path="/lightning" element={<AutoBTC chatMode="lightning" />} />
            <Route path="/images" element={<AutoBTC chatMode="images" />} />
        </Routes>
    </Router>
  );
}

export default App;