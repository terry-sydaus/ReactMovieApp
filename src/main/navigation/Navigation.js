// Navigation.js


import React from 'react';
import Selection from './Selection';
import Slider from './Slider';
import Button from './Button';
import './Navigation.css';

class Navigation extends React.Component {

  componentDidMount() {
    const { setGenres, genres } = this.props;
    const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    fetch(genresURL)
      .then(response => response.json())
    //the following console.log when used as a second optional parameter
    // to the setState method *does* work.
    .then(data => setGenres(data.genres), function() {console.log(genres);})
    //.then(data => this.tempFunction(data))
    .catch(error => console.log(error));
    // the following console.log does not work
    //console.log(this.state.genres);
  }

  componentDidUpdate() {
    //console.log(this.state.genres);
  }

  //console.log(this.state.genres);

  tempFunction = data => {
    console.log(data.genres);
  }


  render() {
    const { genre, genres, onGenreChange, onChange, onSearchButtonClick, year, rating, runtime } = this.props;
    return (
      <section className='navigation'>
	<Selection
	  genres={genres}
	  genre={genre}
	  onGenreChange={onGenreChange}
	/>
	<Slider
	  data={year}
	  onChange={onChange}
	/>
	<Slider
	  data={rating}
	  onChange={onChange}
	/>
	<Slider
	  data={runtime}
	  onChange={onChange}
	/>
	<Button onClick={onSearchButtonClick}>
	  Search
	</Button>
      </section>
    );
  }
}

export default Navigation;
