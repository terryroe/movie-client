import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      title: 'Pulp Fiction',
      genre: {
        name: 'Drama',
        desc: 'The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences.',
      },
      description:
        'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      director: {
        name: 'Quentin Tarantino',
        bio: 'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old.',
        birthday: 'March 27, 1963',
      },
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      featured: true,
    },
    {
      title: 'Excalibur',
      genre: {
        name: 'Fantasy',
        desc: 'The fantasy genre is defined by both circumstance and setting inside a fictional universe with an unrealistic set of natural laws. The possibilities of fantasy are nearly endless, but the movies will often be inspired by or incorporate human myths.  The genre often adheres to general human psychology and societal behavior while incorporating non-scientific concepts like magic, mythical creatures, and supernatural elements.',
      },
      description:
        'Merlin the magician helps Arthur Pendragon unite the Britons around the Round Table of Camelot, even as dark forces conspire to tear it apart.',
      director: {
        name: 'John Boorman',
        bio: `John Boorman attended Catholic school (Salesian Order) although his family was not, in fact, Roman Catholic. His first job was for a dry-cleaner. Later, he worked as a critic for a women's journal and for a radio station until he entered the television business, working for the BBC in Bristol.`,
        birthday: 'January 18, 1933',
      },
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BNmI4MDU0NDUtZTNmZC00YTYwLTk3NzgtMGFmYjg3N2VjODczXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
      featured: true,
    },
    {
      title: 'Casablanca',
      genre: {
        name: 'Romance',
        desc: 'The romance genre is defined by intimate relationships. Sometimes these movies can have a darker twist, but the idea is to lean on the natural conflict derived from the pursuit of intimacy and love.',
      },
      description:
        'A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.',
      director: {
        name: 'Michael Curtiz',
        bio: 'Curtiz began acting in and then directing films in his native Hungary in 1912. After WWI, he continued his filmmaking career in Austria and Germany and into the early 1920s when he directed films in other countries in Europe.',
        birthday: 'December 24, 1886',
      },
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMmNmNzU4NGEtODg3OC00MWIwLWE2OWItY2NlMTVkZjMxZmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
      featured: false,
    },
    {
      title: 'Robocop',
      genre: {
        name: 'Action',
        desc: 'Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.',
      },
      description:
        'In a dystopic and crime-ridden Detroit, a terminally wounded cop returns to the force as a powerful cyborg haunted by submerged memories.',
      director: {
        name: 'Paul Verhoeven',
        bio: 'Paul Verhoeven graduated from the University of Leiden, with a degree in math and physics. He entered the Royal Netherlands Navy, where he began his film career by making documentaries for the Navy and later for TV.',
        birthday: 'July 18, 1938',
      },
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BZWVlYzU2ZjQtZmNkMi00OTc3LTkwZmYtZDVjNmY4OWFmZGJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
      featured: false,
    },
    {
      title: 'The Matrix',
      genre: {
        name: 'Sci-Fi',
        desc: `Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science. Most of James Cameron's best movies lean heavily on science fiction.`,
      },
      description:
        'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
      director: {
        name: 'Lana Wachowski',
        bio: 'Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012). Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly. After the siblings dropped out of college, they started a construction business and wrote screenplays.',
        birthday: 'June 21, 1965',
      },
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
      featured: false,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>No movies in the list!</div>;
  }

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.title}
          movie={movie}
          onMovieClick={(newSelectedMovie) =>
            setSelectedMovie(newSelectedMovie)
          }
        />
      ))}
    </>
  );
};
