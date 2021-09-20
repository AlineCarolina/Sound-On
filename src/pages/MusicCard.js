import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './pageLoading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
// consulta : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number
// https://pt.stackoverflow.com/questions/29014/qual-o-sentido-de-usar-dupla-nega%C3%A7%C3%A3o-em-javascript
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
      this.setState({ favoriteSongs }); // Aqui o array é alimentado com as música favoritas
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
      <section>
        {songs.map(({ trackName, previewUrl, trackId }) => (
          <>
            <div key={ trackId }>
              <h3>{trackName}</h3>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
            <div>
              <label
                htmlFor={ trackId }
              >
                Favorita
                <input
                  checked={ !!favoriteSongs.find((favoriteSong) => (
                    // Com uma negação(!) só em favoriteSongs o valor de checked só fica em false
                    favoriteSong.trackId === trackId)) }
                  id={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
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
