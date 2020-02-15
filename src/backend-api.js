import axios from "axios";

export default class API {
  constructor() {
    this.token = "0d4477ec63c9c98f6bca4d39e31c3670";
    this.lyricsSearchEngineURL = `https://cors-anywhere.herokuapp.com/https://api.audd.io/findLyrics/`;
    this.trackIdSearchEngineURL = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search`;
  }

  async findSongByLyrics({ lyrics }) {
    return await axios.get(
      `${this.lyricsSearchEngineURL}?q=${lyrics}&api_token=${this.token}`
    );
  }

  async findTrackId({ artist, title }) {
    return await axios.get(
      `${this.trackIdSearchEngineURL}?q=artist:"${artist}" title:"${title}"`
    );
  }
}
