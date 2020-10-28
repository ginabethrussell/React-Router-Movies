import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';


export default function SavedList(props) {
  const history = useHistory();
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.list.map(movie => (
        <NavLink to={`/movie/${movie.id}`} className="saved-movie">{movie.title}</NavLink>
      ))}
      <div className="home-button" onClick={() => {
        history.push('/');
      }}>Home</div>
    </div>
  );
}
