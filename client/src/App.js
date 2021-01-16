import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';

import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Team from './Components/Teams/Team'
import Messenger from './Components/Messenger/Messenger'
import Profile from './Components/Profile/Profile'
import { selectUser } from './Components/ReduxStore/appSlice';
import Login from './Components/Login/Login'
import checkAuth from './Components/Login/checkAuth';

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    checkAuth(dispatch);
  }, [])

  return (
    <div className="app">
      <Router>

        {!user ? (
          <>
            <Redirect to="/login" />
            <Login />
          </>
        ) : (
            <>
              <Redirect to="/home" />
              <Navbar />
              <div className='app__body'>

                <Switch>

                  <Route exact path="/home"> 
                    <Home />
                  </Route>

                  <Route exact path="/profile">
                    <Profile />
                  </Route>

                  <Route path="/messenger">
                    <Messenger />
                  </Route>

                </Switch>
              </div>
            </>
          )
        }

      </Router>
    </div >
  );
}

export default App;
