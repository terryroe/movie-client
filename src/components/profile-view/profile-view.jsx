import { Fragment, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const apiUrl = 'https://users-movies-f50a18657028.herokuapp.com';

export const ProfileView = ({ user, token, setUser, movies }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday.split('T')[0]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`${apiUrl}/users/${user.Username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Update failed.');
          throw new Error('Update failed');
        }
      })
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie.Id);
  });

  return (
    <Fragment>
      <Container>
        <Row className="mt-3">
          <h1>Profile</h1>
          <Col md={2}>
            <strong>Username:</strong>
          </Col>
          <Col>{username}</Col>
        </Row>

        <Row>
          <Col md={2}>
            <strong>Email:</strong>
          </Col>
          <Col>{email}</Col>
        </Row>

        <Row className="mt-3">
          <h2>Update Your Profile Information</h2>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Row className="mt-2">
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                minLength={5}
              />
            </Form.Group>
          </Row>

          <Row className="mt-2">
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                minLength={5}
              />
            </Form.Group>
          </Row>

          <Row className="mt-2">
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mt-2">
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                required
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mt-2">
            <Col md={3}>
              <Button variant="primary" type="submit">
                Update Your Profile
              </Button>
            </Col>
          </Row>
        </Form>

        <Row className="mt-4">
          <h2>Your Favorite Movies</h2>
          {favoriteMovies.length === 0 ? (
            <Col>You have no favorite movies yet.</Col>
          ) : (
            favoriteMovies.map((movie) => <h3>{movie.Title}</h3>)
          )}
        </Row>
      </Container>
    </Fragment>
  );
};
