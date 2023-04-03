import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './components/MainView';
import DetailPage from './components/DetailPage';
import NoMatch from './components/NoMatch';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainView/>} />
          <Route path="/detail/:id" element={<DetailPage/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
