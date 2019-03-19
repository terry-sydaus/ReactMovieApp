/* Selection.js */

import React from 'react';
import './Selection.css';

//class Selection extends React.Component {
const Selection = ({ genre, onGenreChange, genres }) => (
      <div className='selection'>
	<label>Genre</label>
	<select value={genre} onChange={onGenreChange}>
	  {genres.map( genre => (
	    <option key={genre.id} value={genre.name}>{genre.name}</option>
	  ))}
	</select>
      </div>
    );

export default Selection;
