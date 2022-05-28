import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/PageLoading';
import soundon from '../images/soundon.gif';
import '../styles/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.renderizaLoad();
  }

  async renderizaLoad() {
    this.setState({ loading: true });
    const user = await getUser();
    if (user) {
      this.setState({
        user,
        loading: false,
      });
    }
  }

  render() {
    const { user, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <header>
        <img src={ soundon } alt="soundon" />
        <section>
          <p>
            { `Welcome, ${user.name}` }
          </p>
          <Link to="/search"> Search </Link>
          <Link to="/favorites"> Favorites </Link>
          <Link to="/profile"> Profile </Link>
        </section>
      </header>
    );
  }
}

export default Header;
