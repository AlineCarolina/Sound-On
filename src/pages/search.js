import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './pageLoading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

// Consultei o repositório da Jéssica Grunewald para me ajudar  a resolver o requisito

class Search extends React.Component {
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
      <div data-testid="page-search">
        <Header />

        { loading
          ? <Loading />
          : (
            <form>
              <input
                data-testid="search-artist-input"
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

export default Search;
