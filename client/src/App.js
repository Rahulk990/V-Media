import './App.css';
// import './Components/Navbar.css'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Feed from './Components/Feed'
import Rightbar from './Components/Rightbar'

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="app__body">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
      
    </div>
  );
}

export default App;
