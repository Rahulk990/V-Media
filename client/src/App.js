import './App.css';
// import './Components/Navbar.css'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Feed from './Components/Feed'
import Widgets from './Components/Widgets'

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="app__body">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
      
    </div>
  );
}

export default App;
