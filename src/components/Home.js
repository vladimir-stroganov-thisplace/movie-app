import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
    state = {
      data: [],
      search: ''
    }

  componentDidMount() {
    const apiKey = "e99043e1b44f1a6d68049b97f2e11003"
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=2`)
    .then(res => {
      this.setState({
        data: res.data.results.slice(0,50)
      });
    })
  }

  performSearch = (target) => {
    const apiKey = "e99043e1b44f1a6d68049b97f2e11003"
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${target}&page=1&include_adult=false`)
    .then(res => {
      this.setState({
        data: res.data.results
      });
    })
  }

  handleChange = (e) => {
    let searchTerm = e.target.value;

    this.setState({
      [e.target.id]: e.target.value
    })

    this.performSearch(searchTerm);
  }

  render() {
    
    const { data } = this.state;
    const dataResult = data.length ? (
      data.map(movie => {
       let posterPath = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        return (
          <div className="post card col l6" key={movie.id}>
            <div className="card-content">
              <div className="row">
                <div className="col l5 m5 s12">
                  <img alt="poster" width="185" height="278" src={posterPath}/>
                </div>
                <div className="col l6  m6  push-m1 push-l1 s12">
                  <span className="card-title">{movie.title}</span>
                  <p>{movie.overview.slice(0,260)+ '...'}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">No data to show</div>
    );
    
    return (
      <div>
          <div className="container">
            <i className="material-icons">search</i>
            <input type="text" id='search' onChange={this.handleChange}
            />
          </div>
          <div className="row">
            {dataResult}
          </div>
        </div>
    );
  }
}

export default Home;
// https://api.themoviedb.org/3/movie/550?api_key=e99043e1b44f1a6d68049b97f2e11003