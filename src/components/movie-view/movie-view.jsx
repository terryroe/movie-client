import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const apiUrl = 'https://users-movies-f50a18657028.herokuapp.com';

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.Id === movieId);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movieId));
  }, []);

  const handleFavorite = () => {
    fetch(`${apiUrl}/users/${user.Username}/movies/${movieId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Something went wrong');
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        setIsFavorite(true);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUnFavorite = () => {
    fetch(`${apiUrl}/users/${user.Username}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Something went wrong');
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        setIsFavorite(false);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Fragment>
      <img src={movie.ImagePath} width="300" alt={movie.Title} />
      <div>
        <span>Title: &nbsp;</span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: &nbsp;</span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: &nbsp;</span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: &nbsp;</span>
        <span>{movie.Director.Name}</span>
      </div>
      <Link to={`/`}>
        <Button variant="link">Back</Button>
      </Link>
      {isFavorite ? (
        <Button onClick={handleUnFavorite} variant="info">
          Remove From Favorites
        </Button>
      ) : (
        <Button onClick={handleFavorite} variant="success">
          Add To Favorites
        </Button>
      )}
    </Fragment>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
  }),
};
