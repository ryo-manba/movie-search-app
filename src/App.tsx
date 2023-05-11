import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const REACT_APP_MOVIE_API_URL = process.env.REACT_APP_MOVIE_API_URL || "";
console.log('REACT_APP_MOVIE_API_URL', REACT_APP_MOVIE_API_URL);
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      }
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(REACT_APP_MOVIE_API_URL)
      .then(res => res.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      })
  }, [])

  const search = (searchValue: any) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });

    fetch(`https://www.omdbapi.com/?=${searchValue}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`)
      .then(res => res.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            payload: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ): (
          movies.map((movie: any, index: any) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
      </div>
    </div>
  );
}

export default App;
