<template>
  <h1>메인화면</h1>
  <div class="row">
    <div v-for="(list, index) in moviesList.list" class="card col-6" style="width: 18rem" :key="index">
      <img :src="list.Poster" alt="" class="card-img-top"  />
      <div class="card-body">
        <h5 class="card-title">{{list.Title }}</h5>
        <p class="card-text">
          {{list.Plot }}
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <h2>영화상세정보</h2>  
  <div class="card" style="width: 18rem;">
    <img :src="movies.list.Poster" alt="" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title"> {{ movies.list.Title }}</h5>
      <p class="card-text">{{ movies.list.Plot }}
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive } from "vue";
export default {
  setup() {
    const URL = `http://www.omdbapi.com/?apikey=1e336a06&s=galaxy`;
    const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=1e336a06`;
    const movies = reactive({ list: [] });
    const moviesList = reactive({ list: [] });
    const getMovisList = () => {
      axios
      .get(URL)
      .then(({ data }) => {
        moviesList.list = data.Search;
        console.log("🍕", moviesList.list);
      });
    };
    const getMovies = () => {
      axios.get(API_URL)
      .then(({ data }) => {
        movies.list = data;
        console.log("list", movies.list);
      });
    };
     const linkMovie = (id) => {
      searchId.value = id
      console.log(id,searchId.value)
      axios
        .get(`http://www.omdbapi.com/?i=${searchId.value}&apikey=1e336a06`)
        .then((res) => {
          res
        })
    }
    getMovisList();
    getMovies();
    return {
      movies,
      moviesList,
      linkMovie
    };
  },
};
</script>

<style></style>