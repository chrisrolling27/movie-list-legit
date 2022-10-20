import React from 'react';
import MovieListEntries from './MovieListEntries.jsx';

class MovieList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }


  render() {

    var filtered = this.props.movies.filter(movie => movie.title.toLowerCase().includes(this.props.query.toLowerCase()));


    return <div className="mlisters" >

      {filtered.map((movie) =>
        <MovieListEntries movie={movie}
          key={movie.id} />)}

    </div>
  }

}

export default MovieList;