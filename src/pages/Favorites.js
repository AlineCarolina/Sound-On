import React from 'react';
import Header from '../components/Header';
import Loading from './PageLoading';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import listen from '../images/listen.png';
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
          <div className="favorites-div">
            <div id="div-img-listen">
              <h2 id="h2-position">Your favorite songs</h2>
              <img src={ listen } alt="listen" id="img-listen" />
            </div>
            <div id="div-music-cards">
              <MusicCard songs={ favorite } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
