import { useEffect, useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';
import MovieTab from './components/MovieTab';
import Pagination from './components/Pagination';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=b2c2c1be';

const movie = {
  Title: 'Formula 1: BBC Sport',
  Year: '2009–2015',
  imdbID: 'tt1540109',
  Type: 'series',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BODY2MTJkOWItNTM0Yi00NDZmLTkwZGYtMTMwMTRlMTJlZGExXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg',
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('bbc');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    async function searchMovie() {
      const response = await fetch(
        `${API_URL}&s=${title}&type=${type}&page=${page}`
      );
      const data = await response.json();
      const sortData = data.Search?.sort((a, b) => (a.Year > b.Year ? -1 : 1));
      setMovies(sortData);
      setTotalPage(Math.ceil(data.totalResults / 10));
    }
    searchMovie();
  }, [title, type, page]);

  return (
    <div className="app">
      <h2>MovieLand</h2>
      <MovieSearch setTitle={setTitle} setType={setType} setPage={setPage} />
      <MovieTab
        setType={setType}
        setMovies={setMovies}
        setTitle={setTitle}
        selectedTab={type}
        setPage={setPage}
      />
      <MovieList movies={movies} />
      {movies && (
        <Pagination
          totalPage={totalPage}
          limit={3}
          setPage={setPage}
          page={page}
        />
      )}
    </div>
  );
}
