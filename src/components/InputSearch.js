import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from '../pages/PageLoading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import phone from '../images/phone.png';
import '../styles/InputSearch.css';

class InputSearch extends React.Component {
  constructor(props) {
    super(props);
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

    return (
      <div>
        <Header />
        { loading
          ? <Loading />
          : (
            <form id="form-search">
              <img src={ phone } alt="phone" id="phone-photo" />
              <p id="p-form">Search by song, album or artist!</p>
              <input
                id="input-search"
                name="inputText"
                value={ inputText }
                type="text"
                onChange={ this.handleChange }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ inputText.length < MIN_CHARACTERS }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
          )}

        { album.length > 0
          ? (
            <div>
              <h3>{`Resultado de álbuns de: ${artist}`}</h3>

              {album
                .map(({ collectionName, collectionId }) => (
                  <section key={ collectionId }>
                    <p>{collectionName}</p>

                    <Link
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                    />

                  </section>))}
            </div>
          )
          : <div>Nenhum álbum foi encontrado</div> }
      </div>
    );
  }
}

export default InputSearch;
