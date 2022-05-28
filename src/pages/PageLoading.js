import React from 'react';
import loading from '../images/loading.gif';
import '../styles/PageLoading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ loading } alt="loading" id="img-loading" />
      </div>
    );
  }
}

export default Loading;
