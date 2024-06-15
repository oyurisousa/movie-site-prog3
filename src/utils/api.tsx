import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTAyNzBiZWI1MDlmODFjNWYzMTk1ZWYyMjYzYTk2MyIsInN1YiI6IjY2NmExOTllZjgxOWZkZTMxOTA3ZDcxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G3NwsbbR8GelKe3lhxnon1x_M4YU_nKQ_68DaZGszPI',
    Accept: 'application/json'
  },

})