import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/PageLoading';
import '../styles/ProfileEdit.css';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.renderizaLoad();
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
  }

  handleClick = () => {
    const { user } = this.state;
    this.setState({ loading: true });
    updateUser(user).then(() => this.setState({ redirect: true }));
  }

  validateEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
  }

  isValid = () => {
    const { user } = this.state;
    let hasError = false;

    const keys = Object.values(user);
    keys.map((item) => {
      if (item.length === 0) {
        hasError = true;
      }
      return null;
    });

    hasError = !this.validateEmail(user.email);

    return hasError;
  }

  renderizaLoad = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    if (user) {
      this.setState({
        user,
        loading: false,
      });
    }
  }

  formEdit() {
    const { user } = this.state;
    return (
      <div>
        <Header />
        <form id="form-profile-edit">
          <label htmlFor="name" className="label-form">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder={ user.name }
              onChange={ this.handleInput }
              className="input-profile-edit"
            />
          </label>
          <label htmlFor="email" className="label-form">
            Email
            <input
              type="text"
              id="email"
              name="email"
              placeholder={ user.email }
              onChange={ this.handleInput }
              className="input-profile-edit"
            />
          </label>
          <label htmlFor="description" className="label-form">
            Description
            <textarea
              id="description"
              name="description"
              placeholder={ user.description }
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="img" className="label-form">
            Image
            <input
              type="text"
              id="img"
              name="img"
              placeholder={ user.img }
              onChange={ this.handleInput }
              className="input-profile-edit"
            />
          </label>
          <button
            type="button"
            id="button-submit-edit"
            disabled={ this.isValid() }
            onClick={ this.handleClick }
          >
            Save
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { loading, redirect } = this.state;

    if (redirect) return <Redirect to="/profile" />;
    return (
      <div>
        { loading ? <Loading /> : this.formEdit() }
      </div>
    );
  }
}

export default ProfileEdit;
