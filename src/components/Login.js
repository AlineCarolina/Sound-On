import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../pages/PageLoading';
import soundon from '../images/soundon.gif';
import '../styles/Login.css';

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
    const inputValue = event.target.value;
    this.setState({
      textoInput: inputValue,
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
      <div id="pricipal-div">
        <form onSubmit={ this.botaoEnviar } id="pricipal-form">
          <label htmlFor="login" id="login-label">
            <img src={ soundon } alt="soundon" id="image-sound" />
            <input
              className="login-input"
              id="input-username"
              placeholder=" Username"
              type="text"
              value={ textoInput }
              onChange={ this.validaInput }
              name="textoInput"
            />
            <input
              className="login-input"
              id="input-passowrd"
              type="password"
              placeholder=" Password"
            />
            <button
              type="submit"
              disabled
              id="submit"
            >
              LOGIN
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
