import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API_URL = process.env.MOVIE_API_URL || ""; // you should replace this with yours

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(res => res.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      })
  }, [])

  const search = (searchValue: any) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?=${searchValue}&apikey=4a3b711b`)
      .then(res => res.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ): (
          movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
      </div>
    </div>
  );
}

export default App;
