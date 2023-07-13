export const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
      <img src={movie.imageUrl} width="300" alt={movie.title} />
      <div>
        <span>Title: &nbsp;</span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: &nbsp;</span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: &nbsp;</span>
        <span>{movie.genre?.name}</span>
      </div>
      <div>
        <span>Director: &nbsp;</span>
        <span>{movie.director.name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </>
  );
};
