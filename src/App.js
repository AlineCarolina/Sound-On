import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  Album,
  Favorites,
  Home,
  NotFound,
  Profile,
  ProfileEdit,
  Search,
} from './pages';
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
        <Route exact path="/edit/profile" component={ ProfileEdit } />
        <Route exact path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
