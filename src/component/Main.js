import React from 'react'
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Main() {
    return (
        <>
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
        </>
    )
}

export default Main
