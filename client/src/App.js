import React, { useState, useEffect } from 'react';
import axios from 'axios';
import{ Route, Switch } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          console.log(response.data);
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    // Filter saved list to see if any movie has the currently selected id
    // Check to make sure the filtered array has a length === 0 to add new movie to 
    // savedList
    if((saved.filter(movie => movie.id === +id)).length === 0){
      const addMovie = movieList.filter(movie => movie.id === +id);
      const newSavedList = [...saved].concat(addMovie);
      setSaved(newSavedList);
    }
  };

  return (
    <div>
      <SavedList list={saved} />

      {/* <div>Replace this Div with your Routes</div> */}
      <Switch>
        <Route path='/movie/:id' render={() => 
          <Movie addToSavedList={addToSavedList}/>
        } />

        <Route path='/' render={()=> <MovieList movies={movieList} />} />
      </Switch>
    </div>
  );
}
