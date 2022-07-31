import { IMovies } from "./MoviesList";

const MovieItem = (props: IMovies) => {
  return <div>{props.original_title}</div>;
};

export default MovieItem;
