const clientId = '083ea5b30084491d897c9afffe95c080';
const redirectUri = 'http://localhost:3000/';

let accessToken;

const Spotify = {
  getAccessToken(){
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/accessToken=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessToken && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);


      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('access Token', null, '/')
      return (accessToken);
    } else {
      const accessUrl =
        `https://accounts.spotify.com/authorize?client_id=${clientId}
        &response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }

  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
        
      }));
  
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.accessToken();
    const headers = { Authorization: `Bearrer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers }
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
    })
  }

}

export default Spotify;