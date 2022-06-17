import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './PageLoading';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

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
        <div id="container-profile-infos">
          <div id="div-profile-infos">
            <div id="div-img-button">
              <div id="div-border-img">
                <img src={ user.img } alt="img-user" id="profile-img" />
              </div>
              <Link to="/edit/profile" id="link-edit-profile"> EDIT PROFILE </Link>
            </div>
            <div id="div-infos">
              <h3>Name</h3>
              <p>{user.name}</p>
              <h3>Email</h3>
              <p>{user.email || 'No registered email'}</p>
              <h3>Descripition</h3>
              <p>{user.description || 'No description registered'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
