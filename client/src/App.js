import './App.css';
import {useState} from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Team from './Components/Teams/Team'
import Messenger from './Components/Messenger/Messenger'

function App() {

  const [path, setPath] = useState('home');

  return (
    <div className="app">
      <Navbar setPath={setPath} />

      <div className='app__body'>
        {path === 'home' && <Home />}
        {path === 'teams' && <Team />}
        {path === 'messenger' && <Messenger />}
      </div>

    </div>
  );
}

export default App;
