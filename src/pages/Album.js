import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import '../styles/Album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicas: [],
      info: {},
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((infos) => {
      const info = infos[0];
      const musicas = infos.slice(1);
      this.setState({ info, musicas });
    });
  }

  render() {
    const {
      info: { artistName, artworkUrl100, collectionName },
    } = this.state;
    const { musicas } = this.state;

    return (
      <section>
        <Header />
        <div id="page-album">
          <div id="album-details">
            <p id="artist-name">{ `${artistName} - ${collectionName}` }</p>
            <img src={ artworkUrl100 } alt={ collectionName } id="image-album" />
          </div>
          <div id="div-music-card">
            <MusicCard songs={ musicas } />
          </div>
        </div>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

};

export default Album;
