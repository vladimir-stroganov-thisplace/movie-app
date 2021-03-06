//Actions to search or add a movie
import axios from 'axios';

const apiKey = "e99043e1b44f1a6d68049b97f2e11003"
export function loadMovie() {
    return (dispatch) => {
        return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`)
        .then((res) => {dispatch(movieResult(res.data.results))})
        .catch((err) => {
          dispatch({ type: 'GET_MOVIES_ERROR', err });
        });
    }
}

export function movieResult(movies) {
    return {
        type: "GET_MOVIES",
        movies: movies
    }
}

export function searchMovie(searchTerm) {
    return (dispatch) => {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
    .then((res) => {dispatch(movieList(res.data.results))})
    .catch((err) => {
      dispatch({ type: 'SEARCH_MOVIES_ERROR', err });
    });;
    }
}

export function movieList(movies) {
    return {
        type: "SEARCH_MOVIES",
        movies: movies
    }
}

export const addMovie = (user, id) => {
    const movieId = id;
    console.log('movieId:', movieId)
    const currentUser = user;
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
        .then((res) => {(sendID(res.data, { getFirebase, getFirestore }, currentUser))});
    }
}


export function sendID(movie, { getFirebase, getFirestore }, currentUser) {
    const firestore = getFirestore();
    firestore.collection('addedMovies').add({
        added: true,
        addedBy: currentUser.firstName,
        overview: movie.overview,
        poster_path: movie.poster_path,
        original_title: movie.original_title,
    }).then(() => {
        return  {
            type: "ADD_MOVIE",
            movie: movie
                }
    }).catch((err) =>{
        return  {
            type: "ERROR_MOVIE",
            movie: err
            }
    })
}


// authActions
export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
      
    }
  }
  
  export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      });
    }
  }
  
  export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      
      firebase.auth().createUserWithEmailAndPassword(
        newUser.email, 
        newUser.password
        ).then(resp => {
          return firestore.collection('users').doc(resp.user.uid).set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
          });
        }).then(() => {
          dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
          dispatch({ type: 'SIGNUP_ERROR', err});
        });
      }
    }
    
    // Remove or vote a movie - actions
    export const voteMovie = (id, user) => {
      return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        console.log('user:', user)
        console.log('user.firstName:', user.firstName)
        firestore.collection('addedMovies').doc(id).update({
          votedBy: firestore.FieldValue.arrayUnion(user.firstName + '  ' + user.lastName)
        }).then(() => {
          dispatch({ type : 'VOTE_RECEIVED'})
        }).catch((err) =>{
          dispatch({ type : 'VOTE_ERROR', err})
        })
      }
    }

    export const removeMovie = (id) => {
        const theId = id
        return (dispatch, getState, { getFirebase, getFirestore }) => {
            const firestore = getFirestore();
            firestore.collection('addedMovies').doc(theId).delete()
            .then(() => console.log('Project deleted successfully'))
            .catch(err => {
              console.error('Error:', err) // eslint-disable-line no-console
            })
        }
    }