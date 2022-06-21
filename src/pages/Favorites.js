import React from 'react';
import Header from '../components/Header';
import Loading from '../components/PageLoading';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import disco from '../images/disco.png';
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

  favoriteSongs() {
    const { favorite } = this.state;
    return (
      <div id="page-favorites">
        <Header />
        <div className="favorites-div">
          <div id="div-img-listen">
            <img src={ disco } alt="disco" id="img-disco" />
          </div>
          <div>
            <h2 id="h2-position">Your favorite songs</h2>
            <div id="div-music-cards">
              <MusicCard songs={ favorite } />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        { loading ? <Loading /> : this.favoriteSongs() }
      </div>
    );
  }
}

export default Favorites;
