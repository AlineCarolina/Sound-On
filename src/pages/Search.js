import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './PageLoading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import disco from '../images/disco.png';
import '../styles/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      loading: false,
      album: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async handleClick() {
    const { inputText } = this.state;
    const artist = inputText;

    this.setState({
      loading: true,
      artist,
    });

    const album = await searchAlbumsAPI(artist);

    this.setState({
      loading: false,
      inputText: '',
      album,
    });
  }

  render() {
    const { inputText, loading, artist, album } = this.state;
    const MIN_CHARACTERS = 2;
    if (loading) return <Loading />;
    if (album.length > 0) {
      return (
        <div id="div-for-albuns">
          <Header />
          <div id="div-input-min">
            <h3 id="h3-text">{`Results for ${artist}`}</h3>
            <div id="input-min">
              <input
                id="input-search-min"
                name="inputText"
                value={ inputText }
                type="text"
                onChange={ this.handleChange }
              />
              <button
                id="search-artist-button-min"
                type="button"
                disabled={ inputText.length < MIN_CHARACTERS }
                onClick={ this.handleClick }
              >
                SEARCH
              </button>
            </div>
          </div>
          <div id="div-card">
            {album
              .map(({ collectionName, collectionId, artworkUrl100 }) => (
                <section key={ collectionId } id="section-card">
                  <Link to={ `/album/${collectionId}` } id="link-card">
                    <p id="p-album">{collectionName}</p>
                    <img src={ artworkUrl100 } alt="img" id="album-img" />
                  </Link>
                </section>))}
          </div>
        </div>
      );
    }

    return (
      <div id="search-div">
        <Header />
        <form id="form-search">
          <img src={ disco } alt="disco" id="disco-img" />
          <p id="p-form">Search by artist!</p>
          <div id="div-input">
            <input
              id="input-search"
              name="inputText"
              value={ inputText }
              type="text"
              onChange={ this.handleChange }
            />
            <button
              id="search-artist-button"
              type="button"
              disabled={ inputText.length < MIN_CHARACTERS }
              onClick={ this.handleClick }
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
