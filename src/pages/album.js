import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './header';
import MusicCard from './MusicCard';

// Consultei o repositório do DANIE CUSTODIO para me ajudar  a resolver o requisito

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
        <div data-testid="page-album">
          <h2 data-testid="artist-name">{artistName}</h2>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h2 data-testid="album-name">{collectionName}</h2>
        </div>
        <div>
          <MusicCard songs={ musicas } />
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
