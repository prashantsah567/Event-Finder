import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './components/MainView';
import DetailPage from './components/DetailPage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainView/>} />
          <Route path="/detail/:id" element={<DetailPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
