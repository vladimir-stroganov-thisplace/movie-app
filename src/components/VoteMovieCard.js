import React, { Component } from 'react'

export class VoteMovieCard extends Component {
        constructor(props) {
          super(props);
          this.state = {
            count: 0
          };
          
          this.decreaseCount = this.decreaseCount.bind(this);
          this.increaseCount = this.increaseCount.bind(this);
        }
        
         decreaseCount() {
          this.setState(() => {
            return {count: this.state.count === 0 ? 0 : this.state.count - 1}
          });
        }
        
        increaseCount() {
          this.setState(() => {
            return {count: this.state.count + 1}
          });
        }

  render() {
    return (
      <div>
        <h3 className="">Please vote your the movie</h3>
          <div className="vote-movie-card">
            <div className="post card">
              <div className="card-content">
                <div className="movie-card__wrapper">
                  <div className="movie-card__poster">
                    <img alt="poster" width="215" height="200" src="http://placeimg.com/400/400/animals"/>
                  </div>
                  <div className="movie-card__content">
                    <div className="movie-card__description">
                      <p>Movie description here</p>
                    </div>
                    <div className="movie-card__votes">
                      <p className='counter-item-votes'
                        style={this.state.count > 5 ? { color: 'lightgreen'} : null }
                        >{this.state.count}
                        <i data-icon="ei-like" data-size="s"></i>
                      </p>
                      <div className='button-list'>
                        <button className='minus' onClick={this.decreaseCount}>-</button>
                        <button className='add' onClick={this.increaseCount}>+</button> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default VoteMovieCard