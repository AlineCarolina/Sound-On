import React, { Component } from 'react';
import { Header, Loading } from '../components';
import AlbumCard from '../components/AlbumCard';
import disco from '../images/disco.png';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      album: [],
      inputText: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleClick = async () => {
    this.setState({ loading: true });
    const { inputText } = this.state;
    const artist = inputText;
    this.setState({ artist });
    const album = await searchAlbumsAPI(artist);
    this.setState({ loading: false, inputText: '', album });
  }

  render() {
    const { loading, album, inputText, artist } = this.state;
    if (loading) return <Loading />;
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
              disabled={ inputText.length < 2 }
              onClick={ this.handleClick }
            >
              SEARCH
            </button>
          </div>
        </form>
        { artist && <p id="p-artist">{`Results for ${artist}`}</p> }
        { album ? <AlbumCard albuns={ album } /> : this.render() }
      </div>
    );
  }
}

export default Search;
