import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './PageLoading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  async componentDidUpdate() {
    await getFavoriteSongs().then((favoriteSongs) => {
      this.setState({ favoriteSongs });
    });
  }

  handleChange = async (event) => {
    const { target: { id, checked } } = event;

    const { songs } = this.props;
    const idFavorite = id;
    this.setState({
      loading: true,
    });
    if (checked) {
      const favoriteSong = songs.find(({ trackId }) => trackId === Number(idFavorite));
      await addSong(favoriteSong);
      this.setState({
        loading: false,
      });
    } else {
      const favoriteSong = songs.find(({ trackId }) => trackId === Number(idFavorite));
      await removeSong(favoriteSong);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { songs } = this.props;
    const { loading, favoriteSongs } = this.state;
    if (loading) { return <Loading />; }
    return (
      <section id="section-music-card">
        {songs.map(({ trackName, previewUrl, trackId }) => (
          <>
            <div key={ trackId } id="player-details">
              <h3 id="h3-music-title">{trackName}</h3>
              <audio id="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
              </audio>
            </div>
            <div>
              <label
                htmlFor={ trackId }
              >
                💜
                <input
                  checked={ !!favoriteSongs.find((favoriteSong) => (
                    favoriteSong.trackId === trackId)) }
                  id={ trackId }
                  type="checkbox"
                  name="favorite"
                  onChange={ this.handleChange }
                />
              </label>
            </div>
          </>
        ))}
      </section>
    );
  }
}
MusicCard.propTypes = {
  songs: PropTypes.arrayOf({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
export default MusicCard;
