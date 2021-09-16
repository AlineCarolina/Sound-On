import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './pageLoading';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.renderizaLoad();
  }

  async renderizaLoad() {
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
      <header data-testid="header-component">
        <section data-testid="header-user-name">
          { user.name }
        </section>
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
      </header>
    );
  }
}

export default Header;
