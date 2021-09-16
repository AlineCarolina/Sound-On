import React from 'react';
import Header from './header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

export default Album;
