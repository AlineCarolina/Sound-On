import React from 'react';
import Header from '../components/Header';
import Loading from './PageLoading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: [],
    };
  }

  componentDidUpdate() {
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
        <MusicCard songs={ favorite } />
      </div>
    );
  }
}

export default Favorites;
