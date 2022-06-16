import React from 'react';
import Header from '../components/Header';
import Loading from './PageLoading';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: [],
    };
  }

  componentDidMount() {
    getFavoriteSongs().then((favoriteSongs) => {
      const favorite = favoriteSongs.slice(1);
      this.setState({ favorite });
    });
  }

  render() {
    const { loading, favorite } = this.state;
    if (loading) { return <Loading />; }
    return (
      <div id="page-favorites">
        <Header />
        <div className="favorites-container">
          <MusicCard songs={ favorite } />
        </div>
      </div>
    );
  }
}

export default Favorites;
