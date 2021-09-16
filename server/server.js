const express = require('express')
const dotenv = require('dotenv').config()
const axios = require('axios')
const app = express()
const SpotifyWebApi = require('spotify-web-api-node')


const PORT = process.env.PORT
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

let accessToken = ''
let refreshToken = ''

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

app.get('/callback', (req, res) => {
  const authCode = req.query.code

  const url = 'https://accounts.spotify.com/api/token'

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: authCode,
    redirect_uri: REDIRECT_URI,
  })

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SECRET
    }
  }

  axios.post(url, params, config)
    .then((result) => {
      const data = result.data
      accessToken = data.access_token
      refreshToken = data.refresh_token
      console.log(data)
      console.log(accessToken)
      console.log(refreshToken)
    })
    .catch((err) => {
      console.log(err)
    })

  res.redirect('/')
})

app.get('/login', (req, res) => {
  const scopes = 'ugc-image-upload playlist-modify-private playlist-read-private playlist-modify-public playlist-read-collaborative user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-modify user-library-read user-read-playback-position user-read-recently-played user-top-read app-remote-control streaming'

  res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + CLIENT_ID +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(REDIRECT_URI));
})

app.get('/', (req, res) => {
  console.log('Snitches get stitches')

  spotifyApi.setAccessToken(accessToken);

  // Get Elvis' albums
  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function(data) {
      console.log('Artist albums', data.body);
    },
    function(err) {
      console.error(err);
    }
  );


  res.send(accessToken)
})

app.listen(PORT || 8888, () => {
  console.log(`Spotify 2.0 server listening on port ${PORT}`)
})