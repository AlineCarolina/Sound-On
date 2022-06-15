import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';
import NotFound from './pages/NotFound';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
