import React from 'react';
import MovieList from './MovieList.jsx';
import axios from 'axios';


var moviesGiven = [
  { title: 'Mean Girls' },
  { title: 'Hackers' },
  { title: 'The Grey' },
  { title: 'Sunshine' },
  { title: 'Ex Machina' },
];


class App extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      movies: [],
      searchtext: '',
      query: '',
      movieadd: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.watchButton = this.watchButton.bind(this);
    this.watchNotButton = this.watchNotButton.bind(this);
  }

  componentDidMount() {
    axios.get('/movies').then((response) => {
      this.setState({ movies: response.data })
    })
  }

  onChange(event) {
    this.setState({ searchtext: event.target.value });
    event.preventDefault();
  }

  onChange2(event) {
    this.setState({ movieadd: event.target.value });
    event.preventDefault();
  }

  onClick(event) {
    this.setState({ query: this.state.searchtext });
    event.preventDefault();
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.movieadd === '') {
      alert("Please add an actual movie title!");
    } else {
      axios.post('/movies', { title: this.state.movieadd, watched: false })
        .then((response) => {
          var newMovies = this.state.movies.slice();
          var newOne = { id: response.data.insertId, title: this.state.movieadd, watched: false };
          newMovies.push(newOne);
          this.setState({ movies: newMovies });
        }
        )
    }
  }

  watchButton() {
    event.preventDefault();
    axios.get('/movies/watched')
    .then((response) => {
      this.setState({ movies : response.data[1]})
    })
  }

  watchNotButton() {
    event.preventDefault();
    axios.get('/movies/watched')
    .then((response) => {
      this.setState({ movies : response.data[0]})
    })
  }


  render() {
    return (

      <div>
        Total movies: {this.state.movies.length}
        <form onSubmit={(event) => this.onSubmit(event)}>
          <input type="text" value={this.state.movieadd} onChange={this.onChange2} placeholder={"Add movie title here"} />
          <input type="submit" className="greenAddButton" />
        </form>

        <form>
          <input type="text" value={this.state.searchtext} onChange={this.onChange} placeholder={"Search..."} />
          <button onClick={(event) => this.onClick(event)} >Go...</button>
        </form>
        <span>&nbsp; </span>
        <button className='watchButton' onClick={this.watchButton}> Watched </button>
        <button className='watchNotButton' onClick={this.watchNotButton}> Not Watched </button>

        <MovieList movies={this.state.movies} query={this.state.query} />
      </div>
    );
  }
}



export default App;