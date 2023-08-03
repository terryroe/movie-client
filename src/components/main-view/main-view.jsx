import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../redux/reducers/movies';
import { setUser } from '../../redux/reducers/user';

const apiUrl = 'https://users-movies-f50a18657028.herokuapp.com';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const user = useSelector((state) => state.user);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const movies = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            Id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImagePath: movie.ImagePath,
            Genre: movie.Genre,
            Director: movie.Director,
          };
        });
        dispatch(setMovies(moviesFromApi));
      });
  }, [token]);

  const handleLogOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar onLoggedOut={handleLogOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <Fragment>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </Fragment>
            }
          />
          <Route
            path="/login"
            element={
              <Fragment>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </Fragment>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <Fragment>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>Loading...</div>
                ) : (
                  <Col md={8}>
                    <MovieView user={user} setUser={setUser} token={token} />
                  </Col>
                )}
              </Fragment>
            }
          />
          <Route
            path="/profile"
            element={
              <Fragment>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={6}>
                    <ProfileView
                      user={user}
                      token={token}
                      setUser={setUser}
                      movies={movies}
                    />
                  </Col>
                )}
              </Fragment>
            }
          />
          <Route
            path="/"
            element={
              <Fragment>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>Loading...</div>
                ) : (
                  <Fragment>
                    {movies.map((movie) => (
                      <Col key={movie.Id} md={3} className="mb-5">
                        <MovieCard movie={movie} user={user} />
                      </Col>
                    ))}
                    <Button onClick={handleLogOut}>Logout</Button>
                  </Fragment>
                )}
              </Fragment>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
