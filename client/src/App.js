import './App.css';

import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Feed from './Components/Feed'
import Widgets from './Components/Widgets'

function App() {
  return (
    <div className="app">

      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />
      
      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets />

    </div>
  );
}

export default App;
