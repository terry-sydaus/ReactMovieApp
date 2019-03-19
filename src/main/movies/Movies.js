// Movies.js

import React from 'react';
import './Movies.css';
import MovieListItem from './MovieListItem';
import Button from '../navigation/Button';
import '../navigation/Button.css';

//const movies =['Breaking Bad', 'Narcos', 'Game of Thrones'];

const Movies = ({
  movies,
  page,
  onPageIncrease,
  onPageDecrease
}) => (
  /* 
  componentDidMount() {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    fetch(apiUrl)
    //Could also use the following as url is passed in with props
    //fetch(this.props.url)
      .then(response => response.json())
    // It is not necessary to do the following in order to populate
    // the movies state array with the values fetched.
    //.then(data => this.storeMovies(data))
    // The following is all that is required.
      .then(data => this.setState({ movies: data.results }))
      .catch(error => console.log(error));
    //console.log(this.state.movies);
  }

  storeMovies = data => {
    console.log(data);
    const movies = data.results.map( result => {
      const { vote_count, id, genre_ids, poster_path, title, vote_average, release_date } = result;
      //return { vote_count: vote_count, id: id, genre_ids: genre_ids, poster_path: poster_path, title: title, vote_average: vote_average, release_date: release_date };
      // The retrn below is the same as the return above, it is just move verbose.
      // It returns an object as an element on each iteration of the map method and adds another object element to the array called movies.
      return { vote_count, id, genre_ids, poster_path, title, vote_average, release_date };
    });
    // The bottom line is that when I mention just one entity in an object, ie. { temp }, this will be interpreted as temp being both the key and the value. If the value does not exist
    // then an error will be thrown, if it does, then it is legal. In other words, { temp } is exactly the same as { temp: temp }

    // this.setState({ movies: movies }); // could also have just placed { movies } inside the this.setState method's parentheses. Like this:
    this.setState({ movies }); 
  }
  */
      <section> 
	<div className='pagination'>
	  <Button onClick={onPageDecrease}>Previous</Button>
	  <span>{`Page ${page}`}</span>
	  <Button onClick={onPageIncrease}>Next</Button>
	</div>
	<ul className='movies'>
	  { movies.map( movie => (
	      <MovieListItem key={movie.id} movie={movie} />
	    ))}
	</ul>
	<div className='pagination'>
	  <Button onClick={onPageDecrease}>Previous</Button>
	  <span>{`Page ${page}`}</span>
	  <Button onClick={onPageIncrease}>Next</Button>
	</div>
      </section>
)

export default Movies;
