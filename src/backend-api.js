import axios from "axios";

export default class API {
  constructor({ songSearchEngineURL, token }) {
    this.token = token;
    this.songSearchEngineURL = songSearchEngineURL;
  }

  async findSongByLyrics({ lyrics }) {
    return await axios.get(
      `${this.songSearchEngineURL}?q=${lyrics}&api_token=${this.token}`
    );
  }

  async findTrackId({ artist, title }) {
    return await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=artist:"${artist}" title:"${title}"`
    );
  }
}
