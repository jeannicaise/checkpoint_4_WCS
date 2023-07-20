require("dotenv").config();
const axios = require("axios");

// ("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1");

// const { API_KEY, API_URL } = process.env;

const browseBySearchQuery = (req, res) => {
  axios
    .get(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
    )
    .then((response) => {
      res.status(200).send(response.data.results);
      // console.log(response.data.results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browseBySearchQuery,
};
