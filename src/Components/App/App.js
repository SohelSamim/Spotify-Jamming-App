import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [
        {name: 'name1', album: 'album1', artist: 'artis1', id: 1 },
        {name: 'name2', album: 'album2', artist: 'artis2', id: 2 },
        {name: 'name3', album: 'album3', artist: 'artis3', id: 3 }]
    }

  }
  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
    <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} />
            <Playlist />
    </div>
  </div>
</div>
    )
  }
}

export default App;
