import './App.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home/Home'
import Team from './Components/Teams/Team' 

function App() {
  return (
    <div className="app">
      <Navbar />

      <div>
        {/* <Home /> */}
        <Team />
      </div>
      
    </div>
  );
}

export default App;
