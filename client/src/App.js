import './App.css';

import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Team from './Components/Teams/Team'
import Messenger from './Components/Messenger/Messenger'
import Profile from './Components/Profile/Profile'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './Components/ReduxStore/appSlice';
import Login from './Components/Login/Login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  return (
    <div className="app">
      <Router>

        {!user ? (
          <Login />
        ) : (
            <div className='app__body'>
              <Navbar />

              <Switch>

                <Route exact path="/home">
                  <Home />
                </Route>

                <Route exact path="/teams">
                  <Team />
                </Route>

                <Route exact path="/messenger">
                  <Messenger />
                </Route>

              </Switch>
            </div>
          )
        }

      </Router>
    </div >
  );
}

export default App;
