import React from 'react';
import './App.css';
import Sidebar from '././component/Sidebar';
import Chat from '././component/Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '././component/Login';
import { useStateValue } from '././component/StateProvider/StateProvider';

function App() {

  const [{ user }, dispatch] = useStateValue();
  
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (<div className="app_body">
            <Router>
              <Sidebar />
              <Switch>
                <Route exact path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route>
                  <Chat />
                </Route>
              </Switch>
            </Router>
        </div>
        )}

    </div>
  );
}

export default App;
