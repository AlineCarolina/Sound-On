import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.validaInput = this.validaInput.bind(this);
    this.botaoEnviar = this.botaoEnviar.bind(this);

    this.state = {
      textoInput: '',
    };
  }

  validaInput(event) {
    this.setState({
      textoInput: event.target.value,
    });
    const { textoInput } = this.state;
    const caracteres = 2;
    if (textoInput.length === caracteres) {
      document.getElementById('submit').disabled = false;
    }
  }

  botaoEnviar() {
    const { textoInput } = this.state;
    createUser({ name: textoInput });
  }

  render() {
    const { textoInput } = this.state;
    return (
      <div data-testid="page-login">
        <form onSubmit={ this.botaoEnviar }>
          <label htmlFor="login">
            Nome
            <input
              data-testid="login-name-input"
              type="text"
              value={ textoInput }
              onChange={ this.validaInput }
              name="textoInput"
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled
              id="submit"
            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
