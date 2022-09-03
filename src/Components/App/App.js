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
        { name: 'name1', album: 'album1', artist: 'artis1', id: 1 },
        { name: 'name2', album: 'album2', artist: 'artis2', id: 2 },
        { name: 'name3', album: 'album3', artist: 'artis3', id: 3 }],
      playlsitName: 'My playlist',
      playlistTracks: [
        { name: 'playlistName1', album: 'playlistAlbum1', artist: 'playlistArtis1', id: 4 },
        { name: 'playlistName2', album: 'playlistAlbum2', artist: 'playlistArtis2', id: 5 },
        { name: 'playlistName3', album: 'playlistAlbum3', artist: 'playlistArtis3', id: 6 }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);

  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    
  }

  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
    <div className="App-playlist"> 
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlsitName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
    </div>
  </div>
</div>
    )
  }
}

export default App;
