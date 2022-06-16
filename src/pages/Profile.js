import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './PageLoading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
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
      <div id="page-profile">
        <Header />
        <p>{user.name}</p>
        <Link to="/edit/profile"> EDIT </Link>
        <p>{user.email}</p>
        <p>{user.descripiton}</p>
        <img src={ user.img } alt="img-user" />
      </div>
    );
  }
}

export default Profile;
