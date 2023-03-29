import MainView from './components/MainView';
import LeftVisual from './components/LeftVisual';
import './App.css';

function App() {

  return (
    <div className="App">
      <div className="container1"><MainView /></div>
      <div className="container2"><LeftVisual /></div>
    </div>
  )
}

export default App
