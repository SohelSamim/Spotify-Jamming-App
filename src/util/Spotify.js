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
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`);
  }

}

export default Spotify;