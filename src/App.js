import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
           <Route exact path='/' component={Home} />
        </div>
      </BrowserRouter>
    );

  }
}

export default App;
// https://api.themoviedb.org/3/movie/550?api_key=e99043e1b44f1a6d68049b97f2e11003