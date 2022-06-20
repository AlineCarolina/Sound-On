import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const { albuns } = this.props;
    return (
      <div id="div-card">
        {albuns
          .map(({ collectionName, collectionId, artworkUrl100 }) => (
            <section key={ collectionId } id="section-card">
              <Link to={ `/album/${collectionId}` } id="link-card">
                <p id="p-album">{collectionName}</p>
                <img src={ artworkUrl100 } alt="img" id="album-img" />
              </Link>
            </section>))}
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albuns: PropTypes.arrayOf({
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
  }).isRequired,
};

export default AlbumCard;
