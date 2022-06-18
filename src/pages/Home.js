import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/PageLoading';
import soundon from '../images/soundon.gif';
import '../styles/Home.css';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      textoInput: '',
      loading: false,
      redirect: false,
    };
  }

  validaInput = (event) => {
    this.setState({ textoInput: event.target.value });
  }

  botaoEnviar = async () => {
    this.setState({ loading: true });
    const { textoInput } = this.state;
    await createUser({ name: textoInput });
    this.setState({ loading: false, redirect: true });
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
              placeholder=" Username"
              type="text"
              value={ textoInput }
              onChange={ this.validaInput }
              name="textoInput"
            />
            <button
              type="submit"
              disabled={ textoInput.length < 2 }
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

export default Home;
