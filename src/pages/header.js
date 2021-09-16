import React from 'react';
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
      </header>
    );
  }
}

export default Header;
