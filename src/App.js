import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div > 
      <div className = "contain">
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route exact path ="/" component={Home}></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
