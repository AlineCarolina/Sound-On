import React from 'react';
import Header from './header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };

    this.validaInput = this.validaInput.bind(this);
  }

  validaInput(event) {
    this.setState({
      inputText: event.target.value,
    });
    const { inputText } = this.state;
    const caracteres = 1;
    if (inputText.length === caracteres) {
      document.getElementById('submit').disabled = false;
    }
  }

  render() {
    const { inputText } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            value={ inputText }
            onChange={ this.validaInput }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled
            id="submit"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
