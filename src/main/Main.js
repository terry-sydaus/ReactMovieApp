// Main.js

import React from 'react';
import './Main.css';
import Navigation from './navigation/Navigation';
import Movies from './movies/Movies';
import LoadingMovie from '../movie/LoadingMovie';

class Main extends React.Component {
  state = { 
    genre: 'Comedy',
    genres: [],
    moviesUrl:  `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`,
    movies: [],
    page: 1,
    total_pages: 1,
    year: {
      label: 'year',
      min: 1980,
      max: 2019,
      step: 1,
      value: { min: 2000, max: 2017 }
    },
    rating: {
      label: 'rating',
      min: 0,
      max: 10,
      step: 1,
      value: { min: 8, max: 10 }
    },
    runtime: {
      label: 'runtime',
      min: 0,
      max: 300,
      step: 15,
      value: { min: 60, max: 120 }
    },
    isLoading: true
  };

  saveStateToLocalStorage = () => {
    localStorage.setItem('sweetpumpkins.params', JSON.stringify(this.state));
  }

  getStateFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('sweetpumpkins.params'));
  }

  // the following method is triggered just once, after this
  // component (Main, in this case) has loaded.
  componentDidMount() {
    const savedState = this.getStateFromLocalStorage();
    if ( !savedState || (savedState && !savedState.movies.length)) {
    //console.log(this.props.url)
    this.fetchMovies(this.state.moviesUrl);
    console.log('Mount component did mount');
    } else {
      this.setState({...savedState});
      this.generateUrl(savedState);
    }
  }

  // the following method is triggered when any state is changed.
  //componentWillUpdate(nextProps, nextState) {
  // and as of March 2019, the official React documnentation states that this method 
  // is being deprecated and should not be used.
  // 
  // The following method is invoked immediately after updating occurs and is *not* called for the 
  // iniital render. Updating occurs automatically when props or state is changed.
   componentDidUpdate(prevProps, prevState, snapshot) {
    this.saveStateToLocalStorage();

    console.log('Main component did update...');
     //console.log(prevState);
     if ('moviesUrl' in prevState) {
	if (this.state.moviesUrl !== prevState.moviesUrl) {
     //console.log('Main component did update...');
     //console.log(this.state.moviesUrl + '.....\r\n' + prevState.moviesUrl);
	  console.log('Main component did update...--> moviesUrl change');
	  this.fetchMovies(this.state.moviesUrl);
	}
     }

     if ('page' in prevState) {
	if(this.state.page !== prevState.page) {
     //console.log('updated page number: ' + this.state.page
     // + '....previous page number: ' + prevState.page);
     console.log('Main component did update...--> page change');
      //console.log('page button pressed');
      //console.log(this.state.page + '.....' + nextState.page);
     this.generateUrl(this.state);
	}
     }
  }
  

  fetchMovies = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => this.storeMovies(data))
      .catch(error => console.log(error));
  }

  storeMovies = data => {
    //console.log(data);
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
    this.setState({ movies, total_pages: data.total_pages, isLoading: false }); 
  }

  generateUrl = params => {
    const { genres, year, rating, runtime, page } = params;
    //console.log(page);
    const selectedGenre = genres.find(genre => genre.name === params.genre);
    const genreId = selectedGenre.id;

    const moviesUrl = `https://api.themoviedb.org/3/discover/movie?` +
      `api_key=${process.env.REACT_APP_TMDB_API_KEY}&` +
      `language=en-US&sort_by=popularity.desc&` +
      `with_genres=${genreId}&` +
      `primary_release_date.gte=${year.value.min}-01-01&` +
      `primary_release_date.lte=${year.value.max}-12-31&` +
      `vote_average.gte=${rating.value.min}&` +
      `vote_average.lte=${rating.value.max}&` +
      `with_runtime.gte=${runtime.value.min}&` +
      `with_runtime.lte=${runtime.value.max}&` +
      `page=${page}`;
    //console.log(moviesUrl);

    this.setState({ moviesUrl });
  }

  onGenreChange = event => {
    this.setState({
      genre: event.target.value,
      //page: 1
    });
  }

  onChange = data => {
    this.setState({
      [data.type]: {
	...this.state[data.type], // new state is the entire old state (spread (...) operator achieves this) 
	value: data.value // new state value property then set to value passed to this function from the slider 
      }
    });
  }

  setGenres = genres => {
    this.setState({genres});
  }

      
  onSearchButtonClick = event => {
    //alert('hi there ' + this.state.genre);
    this.setState({ page: 1 });
    this.generateUrl(this.state);
  }


  onPageIncrease = () => {
    const { page, total_pages } = this.state;
    const nextPage = page + 1;
    if (nextPage <= total_pages) {
    //this.setState({ page: nextPage }, function() { console.log(this.state.page) } );
    //this.setState({ page: nextPage }, this.generateUrl() );
      this.setState({ page: nextPage });
    // console.log(this.state.page);
    }
  }


  onPageDecrease = () => {
    const { page } = this.state;
    const nextPage = page - 1;
    if ( nextPage > 0 ) {
      //this.setState({ page: nextPage }, function() { console.log(this.state.page) } );
      //this.setState({ page: nextPage }, this.generateUrl() );
      this.setState({ page: nextPage });
      //this.setState({ page: nextPage });
      //    console.log(this.state.page);
    }
  }

  render() {
    console.log('Main component render to v dom');
    console.log('Page number for Main component render is ' +
      this.state.page);
    return (
      <section className='main'>
	<Navigation
	  onGenreChange={this.onGenreChange}
	  onChange={this.onChange}
	  setGenres={this.setGenres}
	  onSearchButtonClick={this.onSearchButtonClick}
	  {...this.state}
	/>
	{this.state.isLoading
	? <LoadingMovie />
	: <Movies
	    movies={this.state.movies}
	    page={this.state.page}
	    onPageIncrease={this.onPageIncrease}
	    onPageDecrease={this.onPageDecrease}
	  />
	}
      </section>
    )
  }
}

export default Main;
