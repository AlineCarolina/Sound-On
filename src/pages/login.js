import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './pageLoading';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.validaInput = this.validaInput.bind(this);
    this.botaoEnviar = this.botaoEnviar.bind(this);

    this.state = {
      textoInput: '',
      loading: false,
      redirect: false,
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

  async botaoEnviar() {
    const { textoInput } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: textoInput });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { textoInput, loading, redirect } = this.state;
    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;

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
